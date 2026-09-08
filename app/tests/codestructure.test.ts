import { describe, it, expect } from 'vitest'


export type LintProblem = {
  line: number
  column: number
  character: '"' | "'"
  message: string
}

const quoteRegex = /["']/g

export function lintQuoteEscapes(source: string): LintProblem[] {
  const problems: LintProblem[] = []
  const lines = source.split(/\r?\n/)

  for (let lineIndex = 0; lineIndex < lines.length; lineIndex += 1) {
    const line = lines[lineIndex]
    quoteRegex.lastIndex = 0
    let match: RegExpExecArray | null

    while ((match = quoteRegex.exec(line)) !== null) {
      problems.push({
        line: lineIndex + 1,
        column: match.index + 1,
        character: match[0] as '"' | "'",
        message:
          match[0] === '"'
            ? 'Raw " found. Replace with &quot;, &ldquo;, &#34; or &rdquo;.'
            : "Raw ' found. Replace with &apos;, &lsquo;, &#39; or &rsquo;."
      })
    }
  }

  return problems
}

//  TESTS HERE

describe('lintQuoteEscapes', () => {
  it('should detect unescaped double quotes', () => {
    const result = lintQuoteEscapes('const str = "hello"')
    expect(result.length).toBeGreaterThan(0)
    expect(result[0].character).toBe('"')
  })

  it('should detect unescaped single quotes', () => {
    const result = lintQuoteEscapes("const str = 'hello'")
    expect(result.length).toBeGreaterThan(0)
    expect(result[0].character).toBe("'")
  })

  it('should return empty array for code without quotes', () => {
    const result = lintQuoteEscapes('const x = 5')
    expect(result).toEqual([])
  })
})