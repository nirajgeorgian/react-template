import { AppProvider } from 'containers/context/app'
import { ConnectedRouter } from 'connected-react-router/immutable'
import LinguiProvider from 'containers/context/lingui'
import { Provider } from 'react-redux'
import React from 'react'
import { ResponsiveProvider } from 'containers/context/responsive'
import { BrowserRouter as Router } from 'react-router-dom'
import configureStore from 'store'
import { history } from 'store/rootReducer'
import { render } from '@testing-library/react'

const initialState = {}
const store = configureStore(initialState, history)

const AllContextProviders: React.FC = ({ children }) => (
	<Provider store={store}>
		<ConnectedRouter history={history}>
			<Router>
				<AppProvider>
					<LinguiProvider>
						<ResponsiveProvider>{children}</ResponsiveProvider>
					</LinguiProvider>
				</AppProvider>
			</Router>
		</ConnectedRouter>
	</Provider>
)

const customRender = (ui: React.ReactElement<any>, options?: any) =>
	render(ui, { wrapper: AllContextProviders, ...options })

// re-export everything
export * from '@testing-library/react'

// override render method
export { customRender as render }
