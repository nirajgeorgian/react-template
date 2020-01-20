import React, { Suspense } from 'react'

import App from 'containers/app'
import { AppProvider } from 'containers/context/app'
import PageLoading from 'components/loading/page'

export const RootApp = () => (
	<AppProvider>
		<Suspense fallback={<PageLoading />}>
			<App />
		</Suspense>
	</AppProvider>
)

export default RootApp
