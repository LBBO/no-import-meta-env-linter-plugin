import { RuleTester as ESLintRuleTester } from 'eslint'
import { RuleTester as OxlintRuleTester } from 'oxlint/plugins-dev'
import type { Rule as OxlintRule } from '@oxlint/plugins'
import { describe, it } from 'vitest'

import { rule } from './rule.js'

// `rule`'s type is `ESLintRule & OxlintRule`. `oxlint/plugins-dev` (this file's `OxlintRuleTester`)
// declares its own `Rule` type independently of (though structurally identical to) `@oxlint/plugins`'
// `Rule`, and both are large recursive AST unions. Asking TypeScript 7 to check the ESLint/Oxlint
// intersection directly against that second, independently-declared `Rule` blows its comparison
// stack (TS2321). Narrowing to the `@oxlint/plugins` `Rule` first keeps the check to a single AST
// type system at a time.
const oxlintRule: OxlintRule = rule

const valid = [
  'const x = 1',
  'const env = process.env',
  'import.meta[env]',
  'const meta = import.meta',
  'const url = import.meta.url',
]

const invalid: OxlintRuleTester.InvalidTestCase[] & ESLintRuleTester.InvalidTestCase[] = [
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
}).run('Oxlint: no-import-meta-env', oxlintRule, { valid, invalid })
