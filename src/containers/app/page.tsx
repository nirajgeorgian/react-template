import React, { Component } from 'react'

import AppContext from 'containers/context/app'

class AppBase extends Component<{}, {}> {
	static contextType = AppContext

	render = () => (
		<div className="App">
			<p>app lives here</p>
		</div>
	)
}

export default AppBase
