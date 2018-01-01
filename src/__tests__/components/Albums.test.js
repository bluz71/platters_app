import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Albums from '../../components/Albums';

const flushPromises = () => (
  new Promise(resolve => setImmediate(resolve))
);

describe('<Albums />', () => {
  it('renders without crashing', () => {
    shallow(<Albums />);
  });

  it('renders div.Albums', () => {
    const albums = shallow(<Albums />);
    expect(albums.find('div.Albums').length).toEqual(1);
  });

  it('renders default snapshot', async () => {
    const wrapper = shallow(<Albums />);
    await flushPromises();
    wrapper.update();
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
