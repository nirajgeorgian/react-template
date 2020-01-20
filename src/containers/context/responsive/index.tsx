// import polyfill for responsive
import 'matchmedia-polyfill'
import 'matchmedia-polyfill/matchMedia.addListener'

import React, { Component } from 'react'

import Enquire from 'enquire.js'

export interface IResponsive {
	isMobile: boolean
}
const ResponsiveContext = React.createContext<Partial<IResponsive>>({ isMobile: false })
const { Consumer, Provider } = ResponsiveContext

// interface IProps {}
interface IState {
	isMobile: boolean
}

class ResponsiveBase extends Component<{}, IState> {
	readonly state = {
		isMobile: false
	}

	componentDidMount = () => {
		Enquire.register('only screen and (max-width: 767.99px)', {
			match: () => {
				this.setState({ isMobile: true })
			},
			unmatch: () => {
				this.setState({ isMobile: false })
			}
		})
	}

	render = () => {
		const { isMobile } = this.state

		return <Provider value={{ isMobile }}>{this.props.children}</Provider>
	}
}

export { ResponsiveBase as ResponsiveProvider, Consumer as ResponsiveConsumer }
export default ResponsiveContext
