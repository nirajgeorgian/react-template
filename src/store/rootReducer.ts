import { AnyAction, Reducer } from 'redux'

import appReducer from 'containers/app/reducer'
import authReducer from 'libs/auth/reducer'
import { combineReducers } from 'redux-immutable'
import { connectRouter } from 'connected-react-router/immutable'
import { createBrowserHistory } from 'history'
import { userReducer } from 'libs/user/reducer'

/*
 * connectRouter
 * Creates the main reducer with the dynamically injected ones
 *
 * The reducer merges route location changes into our immutable state.
 * The change is necessitated by moving to react-router-redux@5
 *
 */
export const history = createBrowserHistory()
export const createRootReducer = (injectedReducers?: Reducer<any, AnyAction>) =>
	combineReducers({
		router: connectRouter(history),
		app: appReducer,
		auth: authReducer,
		user: userReducer,
		...injectedReducers
	})

export default createRootReducer()
