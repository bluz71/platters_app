import React from 'react';
import { shallow } from 'enzyme';
import HomePage from '../../components/HomePage.js';

// Details:
//   https://blog.rescale.com/testing-promise-side-effects-with-asyncawait
//   https://github.com/facebook/jest/issues/2157#issuecomment-279171856
const flushPromises = () => new Promise(resolve => setImmediate(resolve));

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
