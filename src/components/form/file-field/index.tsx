import Dragger, { DraggerProps } from 'antd/lib/upload/Dragger'

import { FieldProps } from 'formik/dist/Field'
import Icon from 'antd/lib/icon'
import React from 'react'
import { UploadChangeParam } from 'antd/lib/upload'

interface _ICreateAntFilesFieldProps extends DraggerProps, FieldProps {}
export const CreateAntFilesField: React.FC<_ICreateAntFilesFieldProps> = ({ form, field }) => {
	const fileProps = {
		name: field.name,
		beforeUpload: () => false,
		onChange: (files: UploadChangeParam) => {
			form.setFieldValue(field.name, [...files.fileList])
		},
		multiple: true
	}

	return (
		<Dragger {...fileProps}>
			<p className="ant-upload-drag-icon">
				<Icon type="inbox" />
			</p>
			<p className="ant-upload-text">Click or drag file to this area to upload</p>
			<p className="ant-upload-hint">
				Support for a single or bulk upload. Strictly prohibit from uploading company data or other band files
			</p>
		</Dragger>
	)
}
