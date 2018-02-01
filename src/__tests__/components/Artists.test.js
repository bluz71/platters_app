import React from 'react';
import { shallow } from 'enzyme';
import Artists from '../../components/Artists';

// Details:
//   https://blog.rescale.com/testing-promise-side-effects-with-asyncawait
//   https://github.com/facebook/jest/issues/2157#issuecomment-279171856
const flushPromises = () => new Promise(resolve => setImmediate(resolve));

describe('<Artists />', () => {
  it('renders without crashing', () => {
    shallow(<Artists />);
  });

  it('renders div.Artists', () => {
    const wrapper = shallow(<Artists />);
    expect(wrapper.find('div.Artists').length).toEqual(1);
  });

  it('renders first page', async () => {
    const wrapper = shallow(<Artists />);
    await flushPromises();
    wrapper.update();
    expect(wrapper).toMatchSnapshot();
  });

  it('renders second page', async () => {
    const wrapper = shallow(<Artists history={[]} />);
    // Manually trigger the callback
    wrapper.instance().handlePageChange(2);
    await flushPromises();
    wrapper.update();
    expect(wrapper).toMatchSnapshot();
  });

  it('renders A artists', async () => {
    const wrapper = shallow(<Artists history={[]} />);
    // Manually trigger the callback
    wrapper.instance().handleLetter('A');
    await flushPromises();
    wrapper.update();
    expect(wrapper).toMatchSnapshot();
  });

  it('renders ABC search match', async () => {
    const wrapper = shallow(<Artists history={[]} />);
    // Manually trigger the callback
    wrapper.instance().handleSearchChange('ABC');
    await flushPromises();
    wrapper.update();
    expect(wrapper).toMatchSnapshot();
  });
});

