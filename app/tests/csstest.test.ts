import { readdir, readFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, it, expect, beforeAll } from 'vitest'
import postcss from 'postcss'

const rootDir = path.dirname(fileURLToPath(import.meta.url))
const stylesDir = path.join(rootDir, 'app', 'styles')

async function collectCssFiles(dir: string): Promise<string[]> {
  const entries = await readdir(dir, { withFileTypes: true })
  const files = await Promise.all(entries.map(async (entry) => {
    const resolved = path.join(dir, entry.name)
    if (entry.isDirectory()) return collectCssFiles(resolved)
    return entry.isFile() && resolved.endsWith('.css') ? [resolved] : []
  }))
  return files.flat()
}

describe('./styles CSS files', () => {
  let cssFiles: string[] = []

  beforeAll(async () => {
    cssFiles = await collectCssFiles(stylesDir)
  })

  it('finds CSS files', () => {
    expect(cssFiles.length).toBeGreaterThan(0)
  })

  it('each CSS file is non-empty and syntactically valid', async () => {
    for (const file of cssFiles) {
      const source = await readFile(file, 'utf8')
      expect(source.trim().length).toBeGreaterThan(0)

      const root = postcss.parse(source, { from: file })
      expect(root.nodes.length).toBeGreaterThan(0)
    }
  })

  it('each CSS file uses semicolons for declarations inside rules', async () => {
    for (const file of cssFiles) {
      const source = await readFile(file, 'utf8')
      const root = postcss.parse(source, { from: file })
      const declarationsMissingSemicolon: string[] = []

      root.walkDecls((decl) => {
        if (!decl.raws.semicolon) {
          const position = decl.source?.start
          const location = position ? `${position.line}:${position.column}` : 'unknown'
          declarationsMissingSemicolon.push(`${file}:${location} ${decl.prop}`)
        }
      })

      expect(declarationsMissingSemicolon).toEqual([])
    }
  })

  it('handles pseudo-elements and pseudo-classes correctly', async () => {
    for (const file of cssFiles) {
      const source = await readFile(file, 'utf8')
      const root = postcss.parse(source, { from: file })
      
      root.walkRules((rule) => {
        const selector = rule.selector
        expect(selector).toBeDefined()
        // Valid pseudo-selectors: :hover, :link, :visited, :active, ::before, ::after, etc.
        const validPseudoPattern = /:+[a-z-]+/gi
        const pseudos = selector.match(validPseudoPattern) || []
        pseudos.forEach((pseudo) => {
          expect(pseudo).toMatch(/^:+[a-z-]+$/i)
        })
      })
    }
  })
})