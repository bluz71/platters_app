import React from 'react'
import { shallow } from 'enzyme'
import 'jest-enzyme'
import Layout from '../../components/Layout'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

describe('<Layout />', () => {
  it('renders without crashing', () => {
    shallow(<Layout />)
  })

  it('contains a Header', () => {
    const wrapper = shallow(<Layout />)
    const header = <Header />
    expect(wrapper).toContainReact(header)
  })

  it('contains a Footer', () => {
    const wrapper = shallow(<Layout />)
    const footer = <Footer />
    expect(wrapper).toContainReact(footer)
  })
})
