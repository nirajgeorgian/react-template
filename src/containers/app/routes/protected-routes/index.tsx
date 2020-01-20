import { Redirect, Route, RouteProps } from 'react-router'

import React from 'react'

export interface _IProtectedRouteProps extends RouteProps {
	isAuthenticated: boolean
	isAllowed: boolean
	restrictedPath?: string
	authenticationPath: string
}

const ProtectedRoute: React.FC<_IProtectedRouteProps> = (props) => {
	let redirectPath = ''
	if (!props.isAuthenticated) {
		redirectPath = props.authenticationPath
	}
	if (props.isAuthenticated && !props.isAllowed) {
		redirectPath = props.restrictedPath ? props.restrictedPath : ''
	}

	if (redirectPath) {
		const renderComponent = () => <Redirect to={{ pathname: redirectPath }} />

		return <Route {...props} component={renderComponent} render={undefined} />
	} else {
		return <Route {...props} />
	}
}

export default ProtectedRoute
