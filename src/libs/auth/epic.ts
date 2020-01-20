import { Epic, combineEpics } from 'redux-observable'
import { RootAction, RootState, isActionOf } from 'typesafe-actions'
import { catchError, filter, mapTo, mergeMap, takeUntil } from 'rxjs/operators'
import { fetchAuthLoginAsync, initializeAuthAsync } from 'libs/auth/action'
import { from, of } from 'rxjs'

import AuthApi from './api'
import { IUser } from 'libs/user/state'
import { addUserAction } from 'libs/user/action'
import { fromJS } from 'immutable'
import { setAuthToken } from 'containers/context/app'

export const initializeEpic$: Epic<RootAction, RootAction, RootState> = (action$) =>
	action$.pipe(filter(isActionOf(initializeAuthAsync.request)), mapTo(initializeAuthAsync.success(true)))

export const authSigninEpic$: Epic<RootAction, RootAction, RootState> = (action$) =>
	action$.pipe(
		filter(isActionOf(fetchAuthLoginAsync.request)),
		mergeMap(({ payload }) =>
			from(AuthApi.postLogin(payload)).pipe(
				mergeMap((results) => {
					const user: IUser = results.response

					return from(setAuthToken(user.token)).pipe(
						mergeMap(() => of(fetchAuthLoginAsync.success(user), addUserAction(fromJS(user))))
					)
				}),
				catchError((error) => of(fetchAuthLoginAsync.failure(error))),
				takeUntil(action$.pipe(filter(isActionOf(fetchAuthLoginAsync.cancel))))
			)
		)
	)

const authEpic = combineEpics(initializeEpic$, authSigninEpic$)
export default authEpic
