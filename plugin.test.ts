import { RuleTester as ESLintRuleTester } from 'eslint'
import { RuleTester as OxlintRuleTester } from 'oxlint/plugins-dev'
import { describe, it } from 'vitest'
import plugin from './plugin.ts'

const rule = plugin.rules['no-import-meta-env']

const valid = [
  'const x = 1',
  'const env = process.env',
  'import.meta[env]',
  'const meta = import.meta',
  'const url = import.meta.url',
]


const invalid: OxlintRuleTester.InvalidTestCase[] = [
  {
    code: 'const env = import.meta.env',
    errors: [{ message: 'Using import.meta.env is not allowed.' }],
  },
  {
    code: 'if (import.meta.env.DEV) {}',
    errors: [{ message: 'Using import.meta.env is not allowed.' }],
  },
  {
    code: 'export const x = import.meta.env.VITE_API_URL',
    errors: [{ message: 'Using import.meta.env is not allowed.' }],
  },
  {
    code: 'import.meta["env"]',
    errors: [{ message: 'Using import.meta.env is not allowed.' }],
  },
]

ESLintRuleTester.describe = describe
ESLintRuleTester.it = it

new ESLintRuleTester({
  languageOptions: { ecmaVersion: 2022, sourceType: 'module' },
}).run('ESLint: no-import-meta-env', rule, { valid, invalid })

OxlintRuleTester.describe = describe
OxlintRuleTester.it = it

new OxlintRuleTester({
  languageOptions: { sourceType: 'module' },
}).run('Oxlint: no-import-meta-env', rule, { valid, invalid })
