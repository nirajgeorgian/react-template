import React, { ComponentClass, ReactNode, createContext, useEffect, useMemo, useState } from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'

import { IUser } from 'libs/user/state'
import { compose } from 'redux'
import localforage from 'store/localforage'

export interface IAppProviderProps extends RouteComponentProps {
	children: ReactNode
}
export interface IAppContext {
	user: IUser | null
	setUser: (value: IUser | null) => void
	isAuthenticated: boolean
	setAuthenticated: (token: boolean) => void
	locale: string
	setLocale: (locale: string) => void
	appContextLoading: boolean
	setAppContextLoading: (value: boolean) => void
	headerDrawer: boolean
	setHeaderDrawer: (value: boolean) => void
}

export const TOKEN_NAME = 'stayology-token'
export const hasToken = async (): Promise<boolean> => {
	const token: string = (await localforage.getItem(TOKEN_NAME)) as string

	return !!token && token.length > 0
}
export const setAuthToken = async (token: string): Promise<string> => localforage.setItem(TOKEN_NAME, token)
export const removeAuthToken = async (): Promise<void> => localforage.removeItem(TOKEN_NAME)

const AppContext = createContext<Partial<IAppContext>>({
	locale: 'en'
})
const { Provider, Consumer } = AppContext

const AppProviderBase: React.FC<IAppProviderProps> = ({ children }) => {
	const [locale, setLocale] = useState<string>('en')
	const [isAuthenticated, setAuthenticated] = useState<boolean>(false)
	const [appContextLoading, setAppContextLoading] = useState<boolean>(true)
	const [headerDrawer, setHeaderDrawer] = useState<boolean>(false)

	useEffect(() => {
		const checkToken = async () => {
			const { REACT_APP_STAYOLOGY_URL } = process.env

			const tokenExistOrNot = await hasToken()
			if (tokenExistOrNot) {
				const token: string = (await localforage.getItem(TOKEN_NAME)) as string
				fetch(`${REACT_APP_STAYOLOGY_URL}/account/profile`, {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `${token}`
					}
				})
					.then((response) => response.json())
					.then((data: IUser) => setAuthenticated(tokenExistOrNot))
					.catch(() => setAuthenticated(false))
			}

			setAppContextLoading(false)
		}

		checkToken()
	}, [locale, isAuthenticated])

	const value = useMemo(
		() => ({
			headerDrawer,
			setHeaderDrawer,
			locale,
			setLocale,
			isAuthenticated,
			setAuthenticated,
			appContextLoading,
			setAppContextLoading
		}),
		[locale, isAuthenticated, appContextLoading, headerDrawer]
	)

	return <Provider value={value}>{children}</Provider>
}

const withAppContext = <P extends IAppContext>(WrappedComponent: React.ComponentType<P>) => (
	props: Pick<P, Exclude<keyof P, keyof IAppContext>>
) => <AppContext.Consumer>{(state) => <WrappedComponent {...(props as P)} appContext={state} />}</AppContext.Consumer>

const AppProviderWithHoc = compose<ComponentClass>(withRouter)(AppProviderBase)
AppProviderBase.displayName = 'AppProviderBase'
AppProviderWithHoc.displayName = 'AppProviderBaseWithHoc'

export { AppProviderWithHoc as AppProvider, withAppContext, Consumer as AppConsumer }
export default AppContext
