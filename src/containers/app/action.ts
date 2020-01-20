import {
	HIDE_AUTH,
	INITIALIZE,
	INITIALIZE_CANCEL,
	INITIALIZE_FAILURE,
	INITIALIZE_SUCCESS,
	SHOW_AUTH
} from 'containers/app/constant'
import { createAsyncAction, createStandardAction } from 'typesafe-actions'

export const initializeAppAsync = createAsyncAction(
	INITIALIZE,
	INITIALIZE_SUCCESS,
	INITIALIZE_FAILURE,
	INITIALIZE_CANCEL
)<boolean, boolean, boolean, boolean>()

export const showAuthAction = createStandardAction(SHOW_AUTH)<boolean>()
export const hideAuthAction = createStandardAction(HIDE_AUTH)<boolean>()
