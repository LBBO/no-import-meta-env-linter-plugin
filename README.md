# no-import-meta-env-linter-plugin

A Oxlint / ESLint plugin that forbids the use of `import.meta.env`.

## Installation

```sh
pnpm i jsr:@lbbo/no-import-meta-env-linter-plugin
# or
bunx jsr add @lbbo/no-import-meta-env-linter-plugin
# or
npx jsr add @lbbo/no-import-meta-env-linter-plugin
# or
deno add jsr:@lbbo/no-import-meta-env-linter-plugin
```

## Usage

### Oxlint

```ts
// oxlint.config.ts
import { defineConfig } from 'oxlint'

export default defineConfig({
  jsPlugins: ['@lbbo/no-import-meta-env-linter-plugin']
  rules: {
    'no-import-meta-env-linter-plugin/no-import-meta-env': 'error'
  },
})
```

```json
// .oxlintrc.json
{
  "jsPlugins": ["@lbbo/no-import-meta-env-linter-plugin"],
  "rules": {
    "no-import-meta-env-linter-plugin/no-import-meta-env": "error"
  }
}
```

### ESLint (flat config)

```js
// eslint.config.ts
import { defineConfig } from "eslint/config";
import noImportMetaEnvPlugin from '@lbbo/no-import-meta-env-linter-plugin'

export default defineConfig([
	{
		plugins: {
			'no-import-meta-env-linter-plugin': noImportMetaEnvPlugin,
		},
		rules: {
			"no-import-meta-env-linter-plugin/no-import-meta-env": "error",
		},
	},
]);
])
```

## Rule: `no-import-meta-env`

Disallows access to `import.meta.env`.

**Incorrect code** (reported as errors):

```js
const env = import.meta.env
if (import.meta.env.DEV) {
}
export const apiUrl = import.meta.env.VITE_API_URL
import.meta['env']
```

**Correct code** (not reported):

```js
const env = process.env
const meta = import.meta
const url = import.meta.url
import.meta[dynamicKey]
```
