import { AutoComplete, Checkbox, DatePicker, Form, Input, Radio, Select, TimePicker } from 'antd'
import { FieldProps, FormikProps } from 'formik'

import { FormItemProps } from 'antd/lib/form/FormItem'
import React from 'react'

const FormItem = Form.Item
const { Option } = Select

interface _ICreateAntAntFieldProps extends FieldProps, FormItemProps {
	type: string
	icon?: string
	radioOptions?: Array<string>
	selectOptions?: Array<string>
	simple?: boolean
	submitCount?: number
}
const CreateAntField = (AntComponent: React.ComponentType<any>): React.FC<_ICreateAntAntFieldProps> => ({
	field,
	form,
	hasFeedback,
	label,
	icon,
	selectOptions,
	radioOptions,
	simple = true,
	submitCount,
	type = 'text',
	...props
}): React.ReactElement => {
	const touched = form.touched[field.name]
	const submitted = submitCount && submitCount > 0

	const hasError = form.errors[field.name]
	const submittedError = hasError && submitted
	const touchedError = hasError && touched

	const onInputChange = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) =>
		form.setFieldValue(field.name, value)
	const onCheckboxChange = ({ target: { checked } }: React.ChangeEvent<HTMLInputElement>) =>
		form.setFieldValue(field.name, checked)
	const onChange = (value: FormikProps<any>) => form.setFieldValue(field.name, value)
	const onBlur = () => form.setFieldTouched(field.name, true)

	const renderOption = (option: string) => <Option key={option}>{option}</Option>

	const renderRadio = (radio: string) => (
		<Radio key={radio} value={radio}>
			{radio}
		</Radio>
	)
	const selectOptionsRender = selectOptions ? selectOptions.map(renderOption) : null
	const radioOptionsRender = radioOptions ? radioOptions.map(renderRadio) : null

	return (
		<div className="field-container">
			<FormItem
				className={props.className ? props.className : ''}
				label={label}
				help={submittedError || touchedError ? hasError : false}
				validateStatus={submittedError || touchedError ? 'error' : 'success'}>
				{selectOptionsRender && (
					<AntComponent
						{...field}
						{...props}
						type={type}
						autoComplete="on"
						onBlur={onBlur}
						onChange={type ? onInputChange : onChange}>
						{selectOptionsRender}
					</AntComponent>
				)}
				{radioOptionsRender && (
					<AntComponent
						{...field}
						{...props}
						type={type}
						autoComplete="off"
						radioOptions={['option1', 'option2']}
						onBlur={onBlur}
						onChange={type ? onInputChange : onChange}>
						{radioOptionsRender}
					</AntComponent>
				)}
				{type === 'checkbox' && (
					<AntComponent
						{...field}
						{...props}
						type={type}
						autoComplete="off"
						onBlur={onBlur}
						onChange={onCheckboxChange}
					/>
				)}
				{!selectOptionsRender && !radioOptionsRender && simple && (
					<AntComponent
						{...field}
						{...props}
						type={type}
						autoComplete="off"
						onBlur={onBlur}
						onChange={type ? onInputChange : onChange}
					/>
				)}
			</FormItem>
		</div>
	)
}

export const AntSelect = CreateAntField(Select)
export const AntDatePicker = CreateAntField(DatePicker)
export const AntDateRangePicker = CreateAntField(DatePicker.RangePicker)
export const AntInput = CreateAntField(Input)
export const AntPassword = CreateAntField(Input.Password)
export const AntTimePicker = CreateAntField(TimePicker)
export const AntRadio = CreateAntField(Radio.Group)
export const AntAutoComplete = CreateAntField(AutoComplete)
export const AntCheckbox = CreateAntField(Checkbox)
