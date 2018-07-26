import React from 'react';
import { shallow } from 'enzyme';
import flushPromises from '../../helpers/flushPromises';
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
});
