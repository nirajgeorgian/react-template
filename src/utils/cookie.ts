export const getCookie = (a: string): string => {
	const tmpCookie = document.cookie.match(`(^|;)\\s*${a}\\s*=\\s*([^;]+)`)
	const cookie = tmpCookie ? tmpCookie.pop() : ''

	return cookie || ''
}

export const setCookie = (name: string, value: string, days: number): void => {
	let expires = ''
	if (days) {
		const expiry = new Date()
		expiry.setTime(expiry.getTime() + days * 24 * 60 * 60 * 1000)
		expires = `; expires=${expiry.toUTCString()}`
	}
	document.cookie = `${name}=${value}${expires}; path=/`
}

export const deleteCookie = (name: string): void => {
	document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
}

export const getDefaultLanguage = (): string => getCookie('lang_pref') || 'en'
