import { hideAuthAction, initializeAppAsync, showAuthAction } from 'containers/app/action'

import { createReducer } from 'typesafe-actions'
import initialState from 'containers/app/state'

export const authReducer = createReducer(initialState)
	.handleAction([initializeAppAsync.request, initializeAppAsync.failure, initializeAppAsync.cancel], (iState) =>
		iState.set('initialized', false)
	)
	.handleAction([initializeAppAsync.success], (iState) => iState.set('initialized', true))
	.handleAction([showAuthAction], (iState) => iState.set('showAuth', true))
	.handleAction([hideAuthAction], (iState) => iState.set('showAuth', false))

export default authReducer
export type AppState = ReturnType<typeof authReducer>
