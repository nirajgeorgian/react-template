import { Record, fromJS } from 'immutable'
import { StateType, createReducer } from 'typesafe-actions'
import { fetchAuthLoginAsync, initializeAuthAsync } from 'libs/auth/action'

import { LOGIN } from 'libs/auth/constant'
import initialState from 'libs/auth/state'

export const authReducer = createReducer(initialState)
	.handleAction([initializeAuthAsync.request, initializeAuthAsync.failure], (iState) =>
		iState.set('initialized', false)
	)
	.handleAction([initializeAuthAsync.success], (iState) => iState.set('initialized', true))
	.handleAction([fetchAuthLoginAsync.request], (iState, action: any) => {
		let previousRunningOperations = iState.get('runningOperations')
		if (!previousRunningOperations.includes(action.type)) {
			previousRunningOperations = previousRunningOperations.push(action.type)
		}

		return iState.set('loading', true).set('runningOperations', previousRunningOperations)
	})
	.handleAction([fetchAuthLoginAsync.success], (iState, action: any) => {
		let previousRunningOperations = iState.get('runningOperations')
		if (!previousRunningOperations.includes(LOGIN)) {
			previousRunningOperations = previousRunningOperations.filter((x) => x !== LOGIN)
		}

		return iState
			.set('loading', previousRunningOperations.size > 0)
			.set('runningOperations', previousRunningOperations)
			.set('user', fromJS(action.payload))
	})
	.handleAction([fetchAuthLoginAsync.failure], (iState, action: any) => {
		let previousRunningOperations = iState.get('runningOperations')
		if (!previousRunningOperations.includes(LOGIN)) {
			previousRunningOperations = previousRunningOperations.filter((x) => x !== LOGIN)
		}

		return iState
			.set('loading', previousRunningOperations.size > 0)
			.set('runningOperations', previousRunningOperations)
			.set('error', action.payload)
	})
	.handleAction([fetchAuthLoginAsync.cancel], (iState, action: any) => {
		let previousRunningOperations = iState.get('runningOperations')
		if (!previousRunningOperations.includes(LOGIN)) {
			previousRunningOperations = previousRunningOperations.filter((x) => x !== LOGIN)
		}

		return iState.set('loading', previousRunningOperations.size > 0).set('runningOperations', previousRunningOperations)
	})

export default authReducer
export type AuthState = Record<StateType<typeof authReducer>>
