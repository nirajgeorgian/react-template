import { List, Record } from 'immutable'
import { RootState, StateType } from 'typesafe-actions'

import { IUser } from 'libs/user/state'

export interface IAuthState {
	initialized: boolean
	loading: boolean
	error: string | null
	user: Record<IUser> | null
	runningOperations: List<string>
}

export const IInitialAuthState = Record<IAuthState>(
	{
		initialized: false,
		loading: false,
		error: null,
		user: null,
		runningOperations: List([])
	},
	'IInitialAuthState'
)
export const iInitialAuthState = new IInitialAuthState()

export const IInitialAuthReduxRecord = Record({ auth: iInitialAuthState }, 'IInitialAuthReduxRecord')
export const iInitialAuthRedux = new IInitialAuthReduxRecord()

export type AuthState = typeof iInitialAuthState
export type AuthRecord = Record<StateType<typeof IInitialAuthReduxRecord>>
export type AuthRootState = RootState & AuthRecord

export default iInitialAuthState
