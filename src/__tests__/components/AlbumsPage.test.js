import React from 'react';
import { shallow } from 'enzyme';
import AlbumsPage from '../../components/AlbumsPage';

const flushPromises = () => new Promise(resolve => setImmediate(resolve));

describe('<AlbumsPage />', () => {
  it('renders without crashing', () => {
    shallow(<AlbumsPage />);
  });

  it('renders div.Albums', () => {
    const wrapper = shallow(<AlbumsPage />);
    expect(wrapper.find('div.Albums').length).toEqual(1);
  });

  it('renders first page', async () => {
    const wrapper = shallow(<AlbumsPage />);
    await flushPromises();
    wrapper.update();
    expect(wrapper).toMatchSnapshot();
  });

  it('renders second page', async () => {
    const wrapper = shallow(<AlbumsPage history={[]} />);
    // Manually trigger the callback
    wrapper.instance().handlePageChange(2);
    await flushPromises();
    wrapper.update();
    expect(wrapper).toMatchSnapshot();
  });

  it('renders A albums', async () => {
    const wrapper = shallow(<AlbumsPage history={[]} />);
    // Manually trigger the callback
    wrapper.instance().handleLetter('A');
    await flushPromises();
    wrapper.update();
    expect(wrapper).toMatchSnapshot();
  });

  it('renders 2006 albums', async () => {
    const wrapper = shallow(<AlbumsPage history={[]} />);
    // Manually trigger the callback
    wrapper.instance().handleYear(2006);
    await flushPromises();
    wrapper.update();
    expect(wrapper).toMatchSnapshot();
  });

  it('renders Pop albums', async () => {
    const wrapper = shallow(<AlbumsPage history={[]} />);
    // Manually trigger the callback
    wrapper.instance().handleGenre('Pop');
    await flushPromises();
    wrapper.update();
    expect(wrapper).toMatchSnapshot();
  });

  it('renders random albums', async () => {
    const wrapper = shallow(<AlbumsPage history={[]} />);
    // Manually trigger the callback
    wrapper.instance().handleRandom();
    await flushPromises();
    wrapper.update();
    expect(wrapper).toMatchSnapshot();
  })

  it('renders ABC search match', async () => {
    const wrapper = shallow(<AlbumsPage history={[]} />);
    // Manually trigger the callback
    wrapper.instance().handleSearchChange('ABC');
    await flushPromises();
    wrapper.update();
    expect(wrapper).toMatchSnapshot();
  });
});
