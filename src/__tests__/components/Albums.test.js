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

  it('renders first page', async () => {
    const wrapper = shallow(<Albums />);
    await flushPromises();
    wrapper.update();
    expect(wrapper).toMatchSnapshot();
  });

  it('renders second page', async () => {
    const wrapper = shallow(<Albums history={[]} />);
    // Manually trigger the callback
    wrapper.instance().handlePageChange(2);
    await flushPromises();
    wrapper.update();
    expect(wrapper).toMatchSnapshot();
  });

  it('renders A matches', async () => {
    const wrapper = shallow(<Albums history={[]} />);
    // Manually trigger the callback
    wrapper.instance().handleLetter('A');
    await flushPromises();
    wrapper.update();
    expect(wrapper).toMatchSnapshot();
  });

  it('renders 2006 matches', async () => {
    const wrapper = shallow(<Albums history={[]} />);
    // Manually trigger the callback
    wrapper.instance().handleYear(2006);
    await flushPromises();
    wrapper.update();
    expect(wrapper).toMatchSnapshot();
  });

  it('renders Pop matches', async () => {
    const wrapper = shallow(<Albums history={[]} />);
    // Manually trigger the callback
    wrapper.instance().handleGenre('Pop');
    await flushPromises();
    wrapper.update();
    expect(wrapper).toMatchSnapshot();
  });
});