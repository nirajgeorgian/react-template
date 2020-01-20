import React, { Component } from 'react'

import { ReactReduxContext } from 'react-redux'
import getInjectors from 'utils/reducer-injector'
import hoistNonReactStatics from 'hoist-non-react-statics'

/**
 * Dynamically injects a reducer
 *
 * @param {string} key A key of the reducer
 * @param {Function} reducer A reducer that will be injected
 *
 */

export const injectReducer = ({ key, reducer }: { key: string; reducer: any }) => (
	WrappedComponent: any
): React.ComponentType<any> => {
	class ReducerInjector extends Component {
		static WrappedComponent = WrappedComponent
		static contextType = ReactReduxContext
		static displayName = `withReducer(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`

		constructor (props: any, context: any) {
			super(props, context)
			getInjectors(context.store).injectReducer(key, reducer)
		}

		render = () => <WrappedComponent {...this.props} />
	}

	return hoistNonReactStatics(ReducerInjector, WrappedComponent)
}

export default injectReducer
