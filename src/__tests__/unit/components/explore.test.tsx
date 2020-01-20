import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import HomescreenBanner from 'components/banner/homepage/index'

const ExploreComponent = (
	<HomescreenBanner
		imagesrc="http://www.hdnicewallpapers.com/Walls/Big/Beach/Beautiful_Bondi_Beach_in_Australia_2018_Travel_HD_Wallpaper.jpg"
		imagealt=""
		pretitle="Satyology Experiences"
		title="Indulge in the culture of every city like a local."
		buttontext="Experiences"
	/>
)

it('renders correctly', () => {
  const {  asFragment } = render(ExploreComponent)
    expect(asFragment()).toMatchSnapshot()
})

