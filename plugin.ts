import type { Plugin as ESLintPlugin } from '@eslint/core'
import type { Plugin as OxlintPlugin } from '@oxlint/plugins'

import { rule } from './rule.js'

/**
 * An Oxlint / ESLint plugin that forbids the use of `import.meta.env`.
 */
const plugin: ESLintPlugin & OxlintPlugin = {
  meta: {
    name: 'no-import-meta-env-linter-plugin',
  },
  rules: {
    'no-import-meta-env': rule,
  },
}

export default plugin
