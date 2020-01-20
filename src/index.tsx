import 'index.less'

import * as serviceWorker from 'service-worker'

import { ConnectedRouter } from 'connected-react-router/immutable'
import LogRocket from 'logrocket'
import { Provider } from 'react-redux'
import React from 'react'
import ReactDOM from 'react-dom'
import RootApp from 'App'
import configureStore from 'store/index'
import { history } from 'store/rootReducer'

const initialState = {}
const store = configureStore(initialState, history)
const MOUNT_NODE = document.getElementById('root')

LogRocket.init('il3s2r/stayology')

ReactDOM.render(
	<Provider store={store}>
		<ConnectedRouter history={history}>
			<RootApp />
		</ConnectedRouter>
	</Provider>,
	MOUNT_NODE
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
