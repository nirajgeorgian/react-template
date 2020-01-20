/**
 * Container Generator
 */

const componentExists = require('../utils/componentExists')

module.exports = {
	description: 'Add a Libs name',
	prompts: [
		{
			type: 'input',
			name: 'name',
			message: 'What should it be called?',
			default: 'Form',
			validate: (value) => {
				if (/.+/.test(value)) {
					return componentExists(value) ? 'A component or container or libs with this name already exists' : true
				}

				return 'The name is required'
			}
		},
		{
			type: 'confirm',
			name: 'wantActionsAndReducer',
			default: true,
			message: 'Do you want an actions/constants/selectors/reducer tuple for this container?'
		},
		{
			type: 'confirm',
			name: 'wantEpics',
			default: true,
			message: 'Do you want epics for asynchronous flows? (e.g. fetching data)'
		}
	],
	actions: (data) => {
		// generate base actions
		const actions = []

		// If they want actions and a reducer, generate actions.js, constants.js,
		// reducer.js and the corresponding tests for actions and the reducer
		if (data.wantActionsAndReducer) {
			// Actions
			actions.push({
				type: 'add',
				path: '../../src/libs/{{name}}/action.ts',
				templateFile: './libs/action.ts.hbs',
				abortOnFail: true
			})

			// Constants
			actions.push({
				type: 'add',
				path: '../../src/libs/{{name}}/constant.ts',
				templateFile: './libs/constants.ts.hbs',
				abortOnFail: true
			})

			// Reducer
			actions.push({
				type: 'add',
				path: '../../src/libs/{{name}}/reducer.ts',
				templateFile: './libs/reducer.ts.hbs',
				abortOnFail: true
			})

			// state
			actions.push({
				type: 'add',
				path: '../../src/libs/{{name}}/state.ts',
				templateFile: './libs/state.ts.hbs',
				abortOnFail: true
			})
		}

		// Epics
		if (data.wantEpics) {
			actions.push({
				type: 'add',
				path: '../../src/libs/{{name}}/epic.ts',
				templateFile: './libs/epic.ts.hbs',
				abortOnFail: true
			})
		}

		actions.push({
			type: 'prettify',
			path: '/libs/'
		})

		return actions
	}
}
