import React from 'react'
import { shallow } from 'enzyme'
import 'jest-enzyme'
import AboutPage from '../../components/AboutPage'
import { PageHeader } from 'react-bootstrap'

describe('<AboutPage />', () => {
  it('renders without crashing', () => {
    shallow(<AboutPage />)
  })

  it('contains expected page header', () => {
    const wrapper = shallow(<AboutPage />)
    const pageHeader = <PageHeader>About</PageHeader>
    expect(wrapper).toContainReact(pageHeader)
  })
})
