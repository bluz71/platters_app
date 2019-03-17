import React from 'react';
import { shallow, mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { flushPromises } from '../../helpers/testUtils';
import * as toastModule from '../../helpers/toastMessage';
import SignupPage from '../../components/SignupPage';

describe('<SignupPage />', () => {
  it('renders without crashing', () => {
    shallow(<SignupPage />);
  });

  it('with valid user details', async () => {
    const spyNotice = jest.spyOn(toastModule, 'toastNotice');
    const wrapper = mount(
      <MemoryRouter initialEntries={[{ key: 'testKey' }]}>
        <SignupPage />
      </MemoryRouter>
    );
    wrapper.find('input.email').instance().value = 'fred@example.com';
    wrapper.find('input.password').instance().value = 'password1';
    wrapper.find('input.name').instance().value = 'fred';
    wrapper.find('button').simulate('submit');
    await flushPromises();
    wrapper.update();
    expect(spyNotice).toHaveBeenCalledWith(
      'Hello fred, in order to complete your sign up, please follow the instructions in the email that was just sent to you. Please check your junk folder if you can not find the email.'
    );
    spyNotice.mockRestore();
  });

  it('will abort with invalid user details', async () => {
    const spyAlert = jest.spyOn(toastModule, 'toastAlert');
    const wrapper = mount(
      <MemoryRouter initialEntries={[{ key: 'testKey' }]}>
        <SignupPage />
      </MemoryRouter>
    );
    wrapper.find('input.email').instance().value = 'peter@example.com';
    wrapper.find('input.password').instance().value = 'password1';
    wrapper.find('input.name').instance().value = 'peter';
    wrapper.find('button').simulate('submit');
    await flushPromises();
    wrapper.update();
    expect(spyAlert).toHaveBeenCalledWith('Account could not be created');
    spyAlert.mockRestore();
  });
});
