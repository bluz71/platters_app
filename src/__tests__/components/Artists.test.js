import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Artists from '../../components/Artists';

const flushPromises = () => (
  new Promise(resolve => setImmediate(resolve))
);

describe('<Artists />', () => {
  it('renders without crashing', () => {
    shallow(<Artists />);
  });

  it('renders div.Artists', () => {
    const artists = shallow(<Artists />);
    expect(artists.find('div.Artists').length).toEqual(1);
  });

  it('renders default snapshot', async () => {
    const wrapper = shallow(<Artists />);
    await flushPromises();
    wrapper.update();
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});

