import conformsTo from 'lodash/conformsTo'
import invariant from 'invariant'
import isFunction from 'lodash/isFunction'
import isObject from 'lodash/isObject'

/**
 * Validate the shape of redux store
 *
 * @param store
 */
export default (store: any) => {
	const shape = {
		dispatch: isFunction,
		subscribe: isFunction,
		getState: isFunction,
		replaceReducer: isFunction,
		injectedReducers: isObject
	}
	invariant(conformsTo(store, shape), '(app/utils...) injectors: Expected a valid redux store')
}
