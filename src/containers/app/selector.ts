import { RootState } from 'typesafe-actions'
import { createSelector } from 'reselect'

/**
 * Direct selector to the app state
 *
 * @param state
 */
const createAppDomain = (state: RootState) => state.get('app')

/**
 * Other specific selectors
 */
export const selectLoading = createSelector(createAppDomain, (iDomain) => iDomain.get('loading'))
export const selectInitializing = createSelector(createAppDomain, (iDomain) => iDomain.get('loading'))
export const selectError = createSelector(createAppDomain, (iDomain) => iDomain.get('error'))
export const selectShowAuth = createSelector(createAppDomain, (iDomain) => iDomain.get('showAuth'))
const makeSelectApp = () => createSelector(createAppDomain, (iSubstate) => iSubstate.toJS())
const makeSelectionApp = () =>
	createSelector(
		selectLoading,
		selectInitializing,
		selectError,
		selectShowAuth,
		(appLoading, appInitialized, appError, showAuth) => ({
			appLoading,
			appInitialized,
			appError,
			showAuth
		})
	)

export { makeSelectApp, makeSelectionApp }
export default makeSelectionApp
