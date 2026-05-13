import type { RuleDefinition as ESLintRule } from '@eslint/core'
import type { Rule as OxlintRule } from '@oxlint/plugins'

export const rule: ESLintRule & OxlintRule = {
  create(context) {
    return {
      MetaProperty(meta) {
        // disallow `import.meta.env`

        if (
          meta.meta.name === 'import' &&
          meta.property.name === 'meta' &&
          meta.parent &&
          meta.parent.type === 'MemberExpression' &&
          ((!meta.parent.computed &&
            meta.parent.property.type === 'Identifier' &&
            meta.parent.property.name === 'env') ||
            (meta.parent.computed &&
              meta.parent.property.type === 'Literal' &&
              meta.parent.property.value === 'env'))
        ) {
          context.report({
            node: meta.parent,
            message: 'Using import.meta.env is not allowed.',
          })
        }
      },
    }
  },
}
