import { createLogger } from 'redux-logger'
import { fromJS, isImmutable } from 'immutable'
import { compose, applyMiddleware, createStore, Store } from 'redux'
import { createEpicMiddleware } from 'redux-observable'
import { routerMiddleware } from 'connected-react-router/immutable'

import { rootEpics } from '../../src/store/rootEpic'
import { createRootReducer, history } from 'store/rootReducer'
import { RootAction, RootState } from 'typesafe-actions'

interface IStore extends Store {
	injectedReducers: any
	injectedEpics: any
}

const DevToolsProps = {
	// Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
	trace: true,
	traceLimit: 25,
	// TODO Try to remove when `react-router-redux` is out of beta, LOCATION_CHANGE should not be fired more than once after hot reloading
	// Prevent recomputing reducers for `replaceReducer`
	shouldHotReload: false
}
const composeEnhancers =
	typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
		? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(DevToolsProps)
		: compose

const stateTransformer = (state: object) => {
	if (isImmutable(state)) {
		return state.toJS()
	} else {
		return state
	}
}
const logger = createLogger({
	stateTransformer
})
const epicMiddleware = createEpicMiddleware<RootAction, RootAction, RootState>()

const configureStore = (initialState = fromJS({})) => {
	const middlewares = [epicMiddleware, logger, routerMiddleware(history)]

	const enhancers = composeEnhancers(
		applyMiddleware(...middlewares)
		// other store enhancers if any
	)

	const store: IStore = createStore(createRootReducer(), initialState, enhancers)
	epicMiddleware.run(rootEpics)

	store.injectedReducers = {} // Reducer registry
	store.injectedEpics = {} // Epics registry

	/* eslint-disable */
	if (module.hot) {
		module.hot.accept('./rootReducer', () => {
			const nextRootReducer = require('./rootReducer')
			store.replaceReducer(nextRootReducer())
		})
	}
	/* eslint-disable */

	return store
}

export default configureStore()
