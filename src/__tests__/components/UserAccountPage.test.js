import React from 'react'
import { shallow, mount } from 'enzyme'
import { MemoryRouter } from 'react-router-dom'
import { flushPromises, logInUser } from '../../helpers/testUtils'
import * as toastModule from '../../helpers/toastMessage'
import UserAccountPage from '../../components/UserAccountPage'

describe('<UserAccountPage />', () => {
  it('renders without crashing', () => {
    shallow(
      <MemoryRouter initialEntries={[{ key: 'testKey' }]}>
        <UserAccountPage />
      </MemoryRouter>
    )
  })

  it('renders user account page', () => {
    logInUser()
    const match = { params: { id: 'fred' } }
    const wrapper = mount(
      <MemoryRouter initialEntries={[{ key: 'testKey' }]}>
        <UserAccountPage match={match} />
      </MemoryRouter>
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('update user with valid name and password', async () => {
    logInUser()
    const spyNotice = jest.spyOn(toastModule, 'toastNotice')
    const match = { params: { id: 'fred' } }
    const wrapper = mount(
      <MemoryRouter initialEntries={[{ key: 'testKey' }]}>
        <UserAccountPage match={match} />
      </MemoryRouter>
    )
    wrapper.find('input.name').instance().value = 'freddy'
    wrapper.find('input.password').instance().value = 'password9'
    wrapper.find('button.account-update').simulate('submit')
    await flushPromises()
    expect(spyNotice).toHaveBeenCalledWith(
      'Your account has been successfully updated'
    )
    spyNotice.mockRestore()
  })

  it('update user with invalid details', async () => {
    logInUser()
    const spyAlert = jest.spyOn(toastModule, 'toastAlert')
    const match = { params: { id: 'fred' } }
    const wrapper = mount(
      <MemoryRouter initialEntries={[{ key: 'testKey' }]}>
        <UserAccountPage match={match} />
      </MemoryRouter>
    )
    wrapper.find('input.name').instance().value = 'fre'
    wrapper.find('input.password').instance().value = 'pass'
    wrapper.find('button.account-update').simulate('submit')
    await flushPromises()
    expect(spyAlert).toHaveBeenCalledWith('Your account could not be updated')
    spyAlert.mockRestore()
  })

  it('delete user', async () => {
    logInUser()
    // Mock window.confirm which will be invoked when deleting a user.
    window.confirm = jest.fn(() => true)
    const spyNotice = jest.spyOn(toastModule, 'toastNotice')
    const match = { params: { id: 'fred' } }
    const wrapper = mount(
      <MemoryRouter initialEntries={[{ key: 'testKey' }]}>
        <UserAccountPage match={match} />
      </MemoryRouter>
    )
    wrapper.find('button.account-delete').simulate('click')
    await flushPromises()
    expect(spyNotice).toHaveBeenCalledWith(
      'Your account has been successfully deleted'
    )
    spyNotice.mockRestore()
  })
})
