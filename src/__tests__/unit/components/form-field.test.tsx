import '@testing-library/jest-dom/extend-expect';

import { Field, Form, Formik, FormikValues } from 'formik';
import { fireEvent, render, wait } from '@testing-library/react';

import { AntInput } from 'components/form/form-field'
import Button from 'antd/lib/button';
import React from 'react';

const AntInputComponent = (props: FormikValues): JSX.Element => {
	const { values } = props

	return (
		<Form>
			<Field component={AntInput} id="username" label="username" name="username" value={values.username || ''} />
			<Field component={AntInput} id="password" label="password" name="password" value={values.password || ''} />
			<Button htmlType="submit">
				submit
			</Button>
		</Form>
	)
}

const setup = () => {
	const handleSubmit = jest.fn()
	const handleValidate = jest.fn(() => { })

	const { getByLabelText, getByText, container, debug, ...utils } = render(
		<Formik initialValues={{}} validate={handleValidate} render={AntInputComponent} onSubmit={handleSubmit} />
	)

	const user = { username: 'dodo', password: 'dododuck' }
	const username = container.querySelector('input[name="username"]');
	const password = container.querySelector('input[name="password"]');
	const submit = container.querySelector('button[type="submit"]');

	const changeUsernameInput = (value: string) => username && fireEvent.change(username, { target: { value } })
	const changePasswordInput = (value: string) => password && fireEvent.change(password, { target: { value } })
	const clickSubmit = () => submit && fireEvent.click(submit)

	return {
		...utils,
		handleSubmit,
		user,
		changeUsernameInput,
		changePasswordInput,
		clickSubmit,
	}
}

const setupSuccessCase = async () => {
	const utils = setup()
	utils.changeUsernameInput(utils.user.username)
	utils.changePasswordInput(utils.user.password)
	await wait(() => utils.clickSubmit())

	return utils
}
const setupWithNoPassword = () => {
	const utils = setup()
	utils.changeUsernameInput(utils.user.username)
	utils.clickSubmit()
	const errorMessage = utils.getByRole('alert')

	return { ...utils, errorMessage }
}
const setupWithNoUsername = () => {
	const utils = setup()
	utils.changePasswordInput(utils.user.password)
	utils.clickSubmit()
	const errorMessage = utils.getByRole('alert')

	return { ...utils, errorMessage }
}

// test cases in sequence
test("AntInput field render's properly with <Formik>", () => {
	const onSubmit = jest.fn();
	const { asFragment } = render(
		<Formik initialValues={{}} render={AntInputComponent} onSubmit={onSubmit} />
	)
	expect(asFragment()).toMatchSnapshot()
})
test('calls onSubmit with the username and password', async () => {
	const { handleSubmit } = await setupSuccessCase()

	await wait(() => expect(handleSubmit).toHaveBeenCalledTimes(1))
})