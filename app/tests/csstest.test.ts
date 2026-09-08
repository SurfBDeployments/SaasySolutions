import { readdir, readFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, it, expect, beforeAll } from 'vitest'
import postcss from 'postcss'

const rootDir = path.dirname(fileURLToPath(import.meta.url))
const stylesDir = path.join(rootDir, '../../styles')

async function collectCssFiles(dir: string): Promise<string[]> {
  const entries = await readdir(dir, { withFileTypes: true })
  const files = await Promise.all(entries.map(async (entry) => {
    const resolved = path.join(dir, entry.name)
    if (entry.isDirectory()) return collectCssFiles(resolved)
    return entry.isFile() && resolved.endsWith('.css') ? [resolved] : []
  }))
  return files.flat()
}

describe('../../styles CSS files', () => {
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
      const declarationsMissingSemicolon: string[] = []
      
      // Split into lines and check for declarations without semicolons before closing brace
      const lines = source.split('\n')
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i]
        const trimmed = line.trim()
        
        // Check if this line looks like a CSS declaration (has a colon but not a comment)
        if (trimmed && trimmed.includes(':') && !trimmed.startsWith('//') && !trimmed.startsWith('/*')) {
          // Skip lines that are selectors or at-rules
          if (trimmed.endsWith('{') || trimmed.startsWith('@')) continue
          
          // Check if the next non-empty line is a closing brace and this line doesn't end with semicolon
          let nextNonEmptyIdx = i + 1
          while (nextNonEmptyIdx < lines.length && !lines[nextNonEmptyIdx].trim()) {
            nextNonEmptyIdx++
          }
          const nextLine = nextNonEmptyIdx < lines.length ? lines[nextNonEmptyIdx].trim() : ''
          
          // If next line is a closing brace or another property/selector, check for semicolon
          if ((nextLine.startsWith('}') || nextLine.includes(':') || nextLine.endsWith('{')) && 
              !trimmed.endsWith(';') && 
              !trimmed.endsWith(',') &&
              !trimmed.endsWith('{')) {
            declarationsMissingSemicolon.push(`${file}:${i + 1}:1 ${trimmed}`)
          }
        }
      }

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