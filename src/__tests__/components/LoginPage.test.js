import React from 'react';
import { shallow, mount } from 'enzyme';
import { flushPromises } from '../../helpers/testUtils';
import LoginPage from '../../components/LoginPage';
import { appAuth } from '../../lib/appAuth';

describe('<LoginPage />', () => {
  it('renders without crashing', () => {
    shallow(<LoginPage />);
  });

  it('with valid user credentials', async () => {
    const wrapper = mount(<LoginPage />);
    wrapper.find('input.email').instance().value = 'fred@example.com';
    wrapper.find('input.password').instance().value = 'password1';
    wrapper.find('button').simulate('submit');
    await flushPromises();
    wrapper.update();
    expect(appAuth.isLoggedIn()).toEqual(true);
  });
});
