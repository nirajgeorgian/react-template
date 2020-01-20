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
            <Button htmlType="submit">
				submit
			</Button>
		</Form>
	)
}

const setup = () => {
    const handleSubmit = jest.fn()
    const handleValidate = jest.fn(() => { })

	const { getByLabelText, getByText, container, debug , ...utils } = render(
		<Formik initialValues={{}} validate={handleValidate} render={AntInputComponent} onSubmit={handleSubmit} />
	)

	const user = { username: 'dodo', password: 'dododuck' }
    const username = container.querySelector("#username");
    const submit = container.querySelector('button[type="submit"]');

    const clickSubmit = () => submit && fireEvent.click(submit)
	const changeUsernameInput = (value: string) => username && fireEvent.change(username, { target: { value } })

	return {
		...utils,
        handleSubmit,
        username,
        user,
        clickSubmit,
		changeUsernameInput
	}
}

const setupOnChange = async () => {
    const utils = setup()
    await wait(() => utils.changeUsernameInput(utils.user.username))
    await wait(() => utils.clickSubmit())

	return utils
}


test("AntInput field render's properly with <Formik>", () => {
	const onSubmit = jest.fn();
	const { asFragment } = render(
		<Formik initialValues={{}} render={AntInputComponent} onSubmit={onSubmit} />
	)
	expect(asFragment()).toMatchSnapshot()
})