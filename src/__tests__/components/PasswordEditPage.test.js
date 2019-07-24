import React from 'react'
import { shallow, mount } from 'enzyme'
import { MemoryRouter } from 'react-router-dom'
import { flushPromises } from '../../helpers/testUtils'
import * as toastModule from '../../helpers/toastMessage'
import PasswordEditPage from '../../components/PasswordEditPage'

describe('<PasswordEditPage />', () => {
  it('renders without crashing', () => {
    shallow(
      <MemoryRouter initialEntries={[{ key: 'testKey' }]}>
        <PasswordEditPage />
      </MemoryRouter>
    )
  })

  it('renders password edit form', () => {
    const match = { params: { user_id: 'fred' } }
    const location = {
      search: '?token=08a4f4f96303e9b76e60c9050520078da0621821'
    }
    const history = { replace: jest.fn() }
    const wrapper = mount(
      <MemoryRouter initialEntries={[{ key: 'testKey' }]}>
        <PasswordEditPage match={match} location={location} history={history} />
      </MemoryRouter>
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('with valid password', async () => {
    const spyNotice = jest.spyOn(toastModule, 'toastNotice')
    const match = { params: { user_id: 'fred' } }
    const location = {
      search: '?token=08a4f4f96303e9b76e60c9050520078da0621821'
    }
    const history = { replace: jest.fn() }
    const wrapper = mount(
      <MemoryRouter initialEntries={[{ key: 'testKey' }]}>
        <PasswordEditPage match={match} location={location} history={history} />
      </MemoryRouter>
    )
    wrapper.find('input.password').instance().value = 'password9'
    wrapper.find('button').simulate('submit')
    await flushPromises()
    expect(spyNotice).toHaveBeenCalledWith(
      'Your password has been successfully reset'
    )
    spyNotice.mockRestore()
  })

  it('with invalid token', async () => {
    const spyAlert = jest.spyOn(toastModule, 'toastAlert')
    const match = { params: { user_id: 'john' } }
    const location = {
      search: '?token=08a4f4f96303e9b76e60c9050520078da0621821'
    }
    const history = { replace: jest.fn(), push: jest.fn() }
    const wrapper = mount(
      <MemoryRouter initialEntries={[{ key: 'testKey' }]}>
        <PasswordEditPage match={match} location={location} history={history} />
      </MemoryRouter>
    )
    wrapper.find('input.password').instance().value = 'password9'
    wrapper.find('button').simulate('submit')
    await flushPromises()
    expect(spyAlert).toHaveBeenCalledWith(
      'Incorrect confirmation token, please retry resetting your password again'
    )
    spyAlert.mockRestore()
  })

  it('with invalid new password', async () => {
    const spyAlert = jest.spyOn(toastModule, 'toastAlert')
    const match = { params: { user_id: 'eric' } }
    const location = {
      search: '?token=08a4f4f96303e9b76e60c9050520078da0621821'
    }
    const history = { replace: jest.fn() }
    const wrapper = mount(
      <MemoryRouter initialEntries={[{ key: 'testKey' }]}>
        <PasswordEditPage match={match} location={location} history={history} />
      </MemoryRouter>
    )
    wrapper.find('input.password').instance().value = 'password'
    wrapper.find('button').simulate('submit')
    await flushPromises()
    expect(spyAlert).toHaveBeenCalledWith(
      'Password could not be changed, please make sure the new password is at least 9 characters long'
    )
    spyAlert.mockRestore()
  })
})
