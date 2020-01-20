import { ActionsObservable, StateObservable, combineEpics } from 'redux-observable'
import { RootAction, RootState } from 'typesafe-actions'

import { BehaviorSubject } from 'rxjs'
import appEpics from 'containers/app/epic'
import { mergeMap } from 'rxjs/operators'

export const epic$ = new BehaviorSubject(combineEpics(appEpics))
export const rootEpics = (
	action$: ActionsObservable<RootAction>,
	state$: StateObservable<RootState>,
	dependencies: any
) => epic$.pipe(mergeMap((epic) => epic(action$, state$, dependencies)))
export default rootEpics
