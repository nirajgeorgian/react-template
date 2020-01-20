import { List, Record } from 'immutable'
import { RootState, StateType } from 'typesafe-actions'

export interface IUser {
	id: string
	username: string
	firstName: string
	lastName: string
	email: string
	isAdmin: boolean
	mobile: string
	dialCode: string
	verifiedProperties: List<string>
	account: {
		id: string
		name: {
			first: string
			middle: string
			last: string
			full: string
		}
		profileImage: string
		dialCode: string
		mobile: string
		verifiedProperties: List<string>
	}
	token: string
}
export const IInitialUserObjectState = Record<IUser>({
	id: '',
	username: '',
	firstName: '',
	lastName: '',
	email: '',
	isAdmin: false,
	mobile: '',
	dialCode: '',
	verifiedProperties: List([]),
	account: {
		id: '',
		name: {
			first: '',
			middle: '',
			last: '',
			full: ''
		},
		profileImage: '',
		dialCode: '',
		mobile: '',
		verifiedProperties: List([])
	},
	token: ''
})
export const iInitialUserObjectState = new IInitialUserObjectState()
export type UserType = typeof iInitialUserObjectState

export interface IUserState {
	initialized: boolean
	loading: boolean
	error: string | null
	user: Record<IUser> | null
}
export const IInitialUserState = Record<IUserState>(
	{
		initialized: false,
		loading: false,
		error: null,
		user: null
	},
	'IInitialUserState'
)
export const iInitialUserState = new IInitialUserState()

export const IInitialUserReduxRecord = Record({ user: iInitialUserState }, 'IInitialUserReduxRecord')
export const iInitialUserRedux = new IInitialUserReduxRecord()

export type UserState = typeof iInitialUserState
export type UserRecord = typeof IInitialUserReduxRecord
export type UserRootState = RootState & Record<StateType<UserRecord>>

export default iInitialUserState
