// `plugin.ts`
import { defineRule, eslintCompatPlugin, type Plugin, type Rule } from '@oxlint/plugins'

const rule: Rule = defineRule({
  createOnce(context) {
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
            node: meta,
            message: 'Using import.meta.env is not allowed.',
          })
        }
      },
    }
  },
})

const plugin: Plugin = eslintCompatPlugin({
  meta: {
    name: 'no-import-meta-env-linter-plugin',
  },
  rules: {
    'no-import-meta-env': rule,
  },
})

export default plugin
