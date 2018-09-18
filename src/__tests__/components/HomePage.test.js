import React from 'react';
import { shallow } from 'enzyme';
import { flushPromises, logInUser } from '../../helpers/testUtils';
import HomePage from '../../components/HomePage.js';

describe('<HomePage />', () => {
  it('renders without crashing', () => {
    shallow(<HomePage />);
  });

  it('renders home page', async () => {
    const wrapper = shallow(<HomePage />);
    await flushPromises();
    wrapper.update();
    expect(wrapper).toMatchSnapshot();
  });

  it('renders home page when logged in', async () => {
    logInUser();
    const wrapper = shallow(<HomePage />);
    await flushPromises();
    wrapper.update();
    expect(wrapper).toMatchSnapshot();
  });
});
