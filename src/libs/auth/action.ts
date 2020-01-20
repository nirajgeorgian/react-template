import { createAsyncAction } from 'typesafe-actions'
import {
	INITIALIZE,
	INITIALIZE_SUCCESS,
	INITIALIZE_FAILURE,
	INITIALIZE_CANCEL,
	LOGIN,
	LOGIN_CANCEL,
	LOGIN_FAILURE,
	LOGIN_SUCCESS
} from 'libs/auth/constant'
import { IPostLoginReq } from 'libs/auth/api'
import { IUser } from 'libs/user/state'

export const initializeAuthAsync = createAsyncAction(
	INITIALIZE,
	INITIALIZE_SUCCESS,
	INITIALIZE_FAILURE,
	INITIALIZE_CANCEL
)<boolean, boolean, boolean, boolean>()

export const fetchAuthLoginAsync = createAsyncAction(LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE, LOGIN_CANCEL)<
	IPostLoginReq,
	IUser,
	Error,
	boolean
>()
