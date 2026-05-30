// tests/react-structure.test.ts
import { readdir, readFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, it, expect, beforeAll } from 'vitest'
import { parse, type ParserPlugin } from '@babel/parser'

const rootDir = path.dirname(fileURLToPath(import.meta.url))
const componentsDir = path.join(rootDir, 'components')

async function collectReactFiles(dir: string): Promise<string[]> {
  try {
    const entries = await readdir(dir, { withFileTypes: true })
    const files = await Promise.all(
      entries.map(async (entry) => {
        const resolved = path.join(dir, entry.name)
        if (entry.isDirectory()) return collectReactFiles(resolved)
        return entry.isFile() && /\.[jt]sx$/.test(resolved) ? [resolved] : []
      })
    )
    return files.flat()
  } catch {
    return []
  }
}

function getPlugins(file: string): ParserPlugin[] {
  return file.endsWith('.tsx') || file.endsWith('.ts')
    ? ['jsx', 'typescript']
    : ['jsx']
}

describe('React component files', () => {
  let reactFiles: string[] = []

  beforeAll(async () => {
    reactFiles = await collectReactFiles(componentsDir)
  })

  it('finds JSX/TSX files', () => {
    expect(reactFiles.length).toBeGreaterThan(0)
  })

  it('every file is non-empty with valid syntax', async () => {
    for (const file of reactFiles) {
      const source = await readFile(file, 'utf8')
      expect(source.trim().length, `${file} is empty`).toBeGreaterThan(0)
      expect(
        () => parse(source, { sourceType: 'module', plugins: getPlugins(file) }),
        `Syntax error in ${file}`
      ).not.toThrow()
    }
  })

  it('every file has at least one export', async () => {
    for (const file of reactFiles) {
      const source = await readFile(file, 'utf8')
      const ast = parse(source, { sourceType: 'module', plugins: getPlugins(file) })

      const hasExport = ast.program.body.some(
        (node) =>
          node.type === 'ExportDefaultDeclaration' ||
          node.type === 'ExportNamedDeclaration'
      )
      expect(hasExport, `${file} has no exports`).toBe(true)
    }
  })
})