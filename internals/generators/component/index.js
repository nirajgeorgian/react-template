/**
 * Component Generator
 */

/* eslint strict: ["off"] */

'use strict'

const componentExists = require('../utils/componentExists')

module.exports = {
	description: 'Add an unconnected component',
	prompts: [
		{
			type: 'input',
			name: 'name',
			message: 'What should it be called?',
			default: 'Button',
			validate: (value) => {
				if (/.+/.test(value)) {
					return componentExists(value) ? 'A component or container with this name already exists' : true
				}

				return 'The name is required'
			}
		}
	],
	actions: (data) => {
		// Generate index.js and index.test.js
		const actions = [
			{
				type: 'add',
				path: '../../src/components/{{properCase name}}/index.tsx',
				templateFile: './component/index.tsx.hbs',
				abortOnFail: true
			}
		]

		actions.push({
			type: 'prettify',
			path: '/components/'
		})

		return actions
	}
}
