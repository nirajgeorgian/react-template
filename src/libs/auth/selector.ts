import { AuthRootState, AuthState } from 'libs/auth/state'

import { createSelector } from 'reselect'

/**
 * Direct selector to the auth state
 *
 * @param iState
 */

const createAuthDomain = (iState: AuthRootState): AuthState => iState.get('auth')

/**
 * Other specific selectors
 */
export const selectLoading = createSelector(createAuthDomain, (iDomain) => iDomain.get('loading'))
export const selectInitializing = createSelector(createAuthDomain, (iDomain) => iDomain.get('initialized'))
export const selectError = createSelector(createAuthDomain, (iDomain) => iDomain.get('error'))
export const selectUser = createSelector(createAuthDomain, (iDomain) => {
	const currentUser = iDomain.get('user')
	if (currentUser) {
		return currentUser.toJS()
	}

	return currentUser
})

/**
 * make complete redux record selection
 */
const makeSelectAuth = () => createSelector(createAuthDomain, (iSubstate) => iSubstate.toJS())
const makeSelectionAuth = () =>
	createSelector(
		selectLoading,
		selectInitializing,
		selectError,
		selectUser,
		(authLoading, authInitialized, authError, authUser) => ({
			authLoading,
			authInitialized,
			authError,
			authUser
		})
	)

export { makeSelectAuth, makeSelectionAuth }
export default makeSelectionAuth
