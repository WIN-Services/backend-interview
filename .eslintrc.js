module.exports = {
	"env": {
		"node": true,
		"es2020": true
	},
	"extends": "eslint:recommended",
	"overrides": [
		{
			"env": {
				"node": true
			},
			"files": [
				".eslintrc.{js,cjs}"
			],
			"parserOptions": {
				"sourceType": "script"
			}
		}
	],
	"parserOptions": {
		"ecmaVersion": 2021, // Set to the specific ECMAScript version
		"sourceType": "module"
	},
	"rules": {
		"indent": ["error", "tab"],
		"space-infix-ops": "error",
		"no-mixed-spaces-and-tabs": 0
	}
}