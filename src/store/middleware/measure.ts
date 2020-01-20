import { AnyAction, Dispatch } from 'redux'

const measureMiddleware = () => (next: Dispatch) => (action: AnyAction) => {
	console.time(action.type)
	next(action)
	console.timeEnd(action.type)
}

export default measureMiddleware
