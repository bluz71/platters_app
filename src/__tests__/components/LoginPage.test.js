import React from 'react';
import { shallow, mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { flushPromises, logOutUser } from '../../helpers/testUtils';
import LoginPage from '../../components/LoginPage';
import { appAuth } from '../../lib/appAuth';

describe('<LoginPage />', () => {
  it('renders without crashing', () => {
    shallow(<LoginPage />);
  });

  it('with valid user credentials', async () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={[{ key: 'testKey' }]}>
        <LoginPage />
      </MemoryRouter>
    );
    expect(appAuth.isLoggedIn()).toEqual(false);
    wrapper.find('input.email').instance().value = 'fred@example.com';
    wrapper.find('input.password').instance().value = 'password1';
    wrapper.find('button').simulate('submit');
    await flushPromises();
    wrapper.update();
    expect(appAuth.isLoggedIn()).toEqual(true);
    logOutUser();
  });

  it('with unknown user', async () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={[{ key: 'testKey' }]}>
        <LoginPage />
      </MemoryRouter>
    );
    wrapper.find('input.email').instance().value = 'peter@example.com';
    wrapper.find('input.password').instance().value = 'password1';
    wrapper.find('button').simulate('submit');
    await flushPromises();
    wrapper.update();
    expect(appAuth.isLoggedIn()).toEqual(false);
  });

  it('with invalid password', async () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={[{ key: 'testKey' }]}>
        <LoginPage />
      </MemoryRouter>
    );
    wrapper.find('input.email').instance().value = 'fred@example.com';
    wrapper.find('input.password').instance().value = 'password2';
    wrapper.find('button').simulate('submit');
    await flushPromises();
    wrapper.update();
    expect(appAuth.isLoggedIn()).toEqual(false);
  });
});
