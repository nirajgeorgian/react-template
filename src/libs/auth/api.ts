import { ajax, AjaxResponse } from 'rxjs/ajax'

const { REACT_APP_STAYOLOGY_URL } = process.env

export interface IPostLoginReq {
	username: string
	password: string
}
class AuthApi {
	static postLogin = async (signinReq: IPostLoginReq): Promise<AjaxResponse> =>
		ajax({
			method: 'post',
			url: `${REACT_APP_STAYOLOGY_URL}/account/login`,
			body: signinReq
		}).toPromise()
}

export default AuthApi
