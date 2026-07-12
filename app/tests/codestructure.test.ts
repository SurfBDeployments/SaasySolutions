// tests/react-structure.test.ts
import { readdir, readFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, it, expect, beforeAll } from 'vitest'
import { parse, type ParserPlugin } from '@babel/parser'
import { lintQuoteEscapes } from './codestructure'

const rootDir = path.dirname(fileURLToPath(import.meta.url))
const componentsDir = path.join(rootDir, 'components')
const termsDir = path.join(rootDir, 'terms')

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
      reactFiles = await collectReactFiles(termsDir)
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

describe('Quote escape lint', () => {
  it('flags raw quotes and recommends HTML entities', () => {
    const sample = `
<p>Use &quot;double quotes&quot; or &apos;single quotes&apos;.
But avoid raw " quotes and raw ' quotes in text.
`
    const problems = lintQuoteEscapes(sample)

    expect(problems).toEqual([
      {
        line: 3,
        column: 6,
        character: '"',
        message: 'Raw " found. Replace with &quot;, &ldquo;, &#34; or &rdquo;.'
      },
      {
        line: 3,
        column: 19,
        character: "'",
        message: "Raw ' found. Replace with &apos;, &lsquo;, &#39; or &rsquo;."
      }
    ])
  })
})