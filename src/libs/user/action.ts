import { REMOVE_USER, SET_USER } from 'libs/user/constant'

import { UserType } from 'libs/user/state'
import { createAction } from 'typesafe-actions'

export const addUserAction = createAction(SET_USER, (actionCallback) => (user: UserType) => actionCallback(user))
export const removeUserAction = createAction(REMOVE_USER)
