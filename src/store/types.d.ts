import { ActionType, StateType } from 'typesafe-actions'
import { Record } from 'immutable'

declare module 'typesafe-actions' {
	export type Store = StateType<typeof import('store/index').default>
	export type RootState = Record<StateType<typeof import('store/rootReducer').default>>
	export type RootAction = ActionType<typeof import('store/rootAction').default>

	interface ITypes {
		RootAction: RootAction
	}
}
