// `plugin.ts`
import { defineRule, eslintCompatPlugin } from '@oxlint/plugins'

const rule = defineRule({
  createOnce(context) {
    return {
      MetaProperty(meta) {
        // disallow `import.meta.env`

        if (
          meta.meta.name === 'import' &&
          meta.property.name === 'meta' &&
          meta.parent &&
          meta.parent.type === 'MemberExpression' &&
          meta.parent.property.type === 'Identifier' &&
          meta.parent.property.name === 'env'
        ) {
          context.report({
            node: meta,
            message: 'Using import.meta.env is not allowed.',
          })
        }
      },
    }
  },
})

export default eslintCompatPlugin({
  meta: {
    name: 'no-import-meta-env-linter-plugin',
  },
  rules: {
    'no-import-meta-env': rule,
  },
})
