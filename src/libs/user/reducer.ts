import { StateType, createReducer } from 'typesafe-actions'
import { addUserAction, removeUserAction } from 'libs/user/action'
import iInitialUserState, { IUser } from 'libs/user/state'

import { Record } from 'immutable'

export const userReducer = createReducer(iInitialUserState)
	.handleAction(addUserAction, (iState, action: any) => iState.set('user', action.payload as Record<IUser>))
	.handleAction(removeUserAction, (iState) => iState.set('user', null))

export default userReducer
export type UserState = Record<StateType<typeof userReducer>>
