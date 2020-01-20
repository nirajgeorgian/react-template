import * as appActions from 'containers/app/action'
import * as authActions from 'libs/auth/action'
import * as userAction from 'libs/user/action'

import { routerActions } from 'connected-react-router/immutable'

export default {
	app: appActions,
	auth: authActions,
	router: routerActions,
	user: userAction
}
