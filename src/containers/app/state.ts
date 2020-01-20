import { RootState, StateType } from 'typesafe-actions'

import { Record } from 'immutable'

interface IAppState {
	initialized: boolean
	loading: boolean
	error: string | null
	showAuth: boolean
}
export const IInitialAppState = Record<IAppState>(
	{
		initialized: false,
		loading: false,
		error: null,
		showAuth: false
	},
	'IInitialAppState'
)

const iInitialAppState = new IInitialAppState()

export const IInitialAppReduxRecord = Record({ app: iInitialAppState }, 'IInitialAppReduxRecord')
export const iInitialAppRedux = new IInitialAppReduxRecord()

export type AppState = typeof iInitialAppState
export type AppRecord = typeof IInitialAppReduxRecord
export type AppRootState = RootState & Record<StateType<AppRecord>>

export default iInitialAppState
