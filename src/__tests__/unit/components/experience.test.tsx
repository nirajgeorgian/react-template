import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Experience from 'components/cards/experience'

const ExperienceCompoent = (
	<Experience
		imagesrc="http://www.thebirdwheel.com/wp-content/uploads/2011/07/New-York-Bike-Portrait-Kim-Burgas-6.jpg"
		pretitle="Experience | Restaurant"
		title="Gazebo"
		city="Abu dhabi"
		country="UAE"
		languages="Urdu,North Indian,leabenese"
		currency="$"
		price="100"
	/>
)
//for rendering
it('renders correctly', () => {
	const { asFragment } = render(ExperienceCompoent)
	expect(asFragment()).toMatchSnapshot()
})

// it('image in the card', () => {
// 	const { getByTestId } = render(ExperienceCompoent)
// 	const ancestor = document.querySelector('[data-testid="stayology_experience_card"]')
// 	const descendant = document.querySelector('[data-testid="satyology_experience_carousel_img"]')
// 	expect(ancestor).toContainElement(descendant)
// })
