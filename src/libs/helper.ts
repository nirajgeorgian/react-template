import localforage from 'store/localforage'

export const TOKEN_NAME = 'stayology-token'

export class AuthToken {
	static getToken = (): Promise<string> => localforage.getItem(TOKEN_NAME)
}
