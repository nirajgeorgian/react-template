export const validateEmail = (value: string) => {
	let errors

	if (!value) {
		errors = 'Required!'
	} else if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
		errors = 'Invalid email address!'
	}

	return errors
}

export const validatePhone = (value: string) => {
	let errors
	if (!value) {
		errors = 'Required!'
	} else if (!/^[0-9]{10}$/.test(value)) {
		errors = 'Invalid phone number!'
	}

	return errors
}

export const isRequired = (value: string) => (!value ? 'Required!' : '')
