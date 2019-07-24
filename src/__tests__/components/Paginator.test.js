import React from 'react'
import { shallow, mount } from 'enzyme'
import Paginator from '../../components/Paginator'

describe('<Paginator />', () => {
  it('renders without crashing', () => {
    const pagination = { current_page: 1, total_pages: 2 }
    shallow(<Paginator pagination={pagination} />)
  })

  it('clicks page 1 link', () => {
    const pagination = { current_page: 1, total_pages: 2 }
    const spyPageChange = jest.fn()
    const wrapper = mount(
      <Paginator pagination={pagination} onPageChange={spyPageChange} />
    )
    wrapper
      .find('SafeAnchor')
      .at(0)
      .simulate('click')
    expect(spyPageChange).toHaveBeenCalledWith(1, expect.anything())
  })

  it('clicks page 2 link', () => {
    const pagination = { current_page: 1, total_pages: 2 }
    const spyPageChange = jest.fn()
    const wrapper = mount(
      <Paginator pagination={pagination} onPageChange={spyPageChange} />
    )
    wrapper
      .find('SafeAnchor')
      .at(1)
      .simulate('click')
    expect(spyPageChange).toHaveBeenCalledWith(2, expect.anything())
  })

  it('clicks next page link', () => {
    const pagination = { current_page: 1, total_pages: 2 }
    const spyPageChange = jest.fn()
    const wrapper = mount(
      <Paginator pagination={pagination} onPageChange={spyPageChange} />
    )
    wrapper
      .find('SafeAnchor')
      .at(2)
      .simulate('click')
    expect(spyPageChange).toHaveBeenCalledWith(2, expect.anything())
  })

  it('clicks first page link', () => {
    const pagination = { current_page: 3, total_pages: 3 }
    const spyPageChange = jest.fn()
    const wrapper = mount(
      <Paginator pagination={pagination} onPageChange={spyPageChange} />
    )
    wrapper
      .find('SafeAnchor')
      .at(0)
      .simulate('click')
    expect(spyPageChange).toHaveBeenCalledWith(1, expect.anything())
  })

  it('clicks last page link', () => {
    const pagination = { current_page: 1, total_pages: 3 }
    const spyPageChange = jest.fn()
    const wrapper = mount(
      <Paginator pagination={pagination} onPageChange={spyPageChange} />
    )
    wrapper
      .find('SafeAnchor')
      .at(4)
      .simulate('click')
    expect(spyPageChange).toHaveBeenCalledWith(3, expect.anything())
  })
})
