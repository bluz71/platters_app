import React from 'react';
import { shallow } from 'enzyme';
import Albums from '../../components/Albums';

const flushPromises = () => new Promise(resolve => setImmediate(resolve));

describe('<Albums />', () => {
  it('renders without crashing', () => {
    shallow(<Albums />);
  });

  it('renders div.Albums', () => {
    const wrapper = shallow(<Albums />);
    expect(wrapper.find('div.Albums').length).toEqual(1);
  });

  it('renders default snapshot', async () => {
    const wrapper = shallow(<Albums />);
    await flushPromises();
    wrapper.update();
    expect(wrapper).toMatchSnapshot();
  });
});
