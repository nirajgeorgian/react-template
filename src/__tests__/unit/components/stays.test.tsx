import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import StaysComponent from 'components/cards/stays'

test('displays stays card with appripiate data', async () => {
	const { getByText } = render(
		<StaysComponent
			place="Istanbul"
			loading={false}
			hoverable={true}
			imagesrc="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
			imagealt="title iamge"
			title="dodo duck"
			description="dodo duck lives here"
		/>
	)

	expect(getByText('dodo duck')).toBeInTheDocument()
})
