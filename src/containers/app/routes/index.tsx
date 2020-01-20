import { Route, Switch } from 'react-router-dom'

import Layout from 'antd/lib/layout'
import PageNotFound from 'containers/pages/not-found'
import React from 'react'

const AppRoutes = () => (
	<Layout.Content>
		<Switch>
			<Route component={PageNotFound} />
		</Switch>
	</Layout.Content>
)
export default AppRoutes
