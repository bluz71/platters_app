import React from 'react'
import { shallow } from 'enzyme'
import 'jest-enzyme'
import Header from '../../components/Header'
import logo from '../../images/platters-white.svg'
import { Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'

describe('<Header />', () => {
  it('renders without crashing', () => {
    shallow(<Header />)
  })

  it('contains a brand', () => {
    const wrapper = shallow(<Header />)
    const brand = (
      <Navbar.Brand>
        <Link to='/' className='PlattersBrand'>
          <img src={logo} alt='Platters' /> platters
        </Link>
      </Navbar.Brand>
    )
    expect(wrapper).toContainReact(brand)
  })
})
