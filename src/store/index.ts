import { RootAction, RootState } from 'typesafe-actions'
import { Store, applyMiddleware, compose, createStore } from 'redux'
import { fromJS, isImmutable } from 'immutable'

import { History } from 'history'
import { createEpicMiddleware } from 'redux-observable'
import { createLogger } from 'redux-logger'
import { createRootReducer } from 'store/rootReducer'
import { rootEpics } from 'store/rootEpic'
import { routerMiddleware } from 'connected-react-router/immutable'

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
	process.env.NODE_ENV !== 'production' && typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
		? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(DevToolsProps)
		: compose

const stateTransformer = (state: { [key: string]: {} }) => {
	if (isImmutable(state)) {
		return state.toJS()
	}

	return state
}
const logger = createLogger({
	collapsed: true,
	diff: true,
	stateTransformer
})
const epicMiddleware = createEpicMiddleware<RootAction, RootAction, RootState>()

const configureStore = (initialState = {}, history: History<any>) => {
	const middlewares = [epicMiddleware, logger, routerMiddleware(history)]

	const enhancers = composeEnhancers(
		applyMiddleware(...middlewares)
		// other store enhancers if any
	)

	const store: IStore = createStore(createRootReducer(), fromJS(initialState), enhancers)
	epicMiddleware.run(rootEpics)

	// Extensions
	// store.runSaga = sagaMiddleware.run;
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

export default configureStore
