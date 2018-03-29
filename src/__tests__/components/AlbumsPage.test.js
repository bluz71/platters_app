import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { shallow, mount } from 'enzyme';
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
    // Note: https://reacttraining.com/react-router/core/guides/testing/
    //       https://github.com/ReactTraining/react-router/issues/5579#issuecomment-333401692
    const wrapper = mount(
      <MemoryRouter initialEntries={[ { key: 'testKey' } ]}>
        <AlbumsPage />
      </MemoryRouter>
    );
    await flushPromises();
    wrapper.update();
    expect(wrapper).toMatchSnapshot();
  });

  it('renders second page', async () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={[{ key: 'testKey' }]}>
        <AlbumsPage history={[]} />
      </MemoryRouter>
    );
    // Manually trigger the callback.
    // Note: https://github.com/airbnb/enzyme/issues/361
    wrapper.find(AlbumsPage).instance().handlePageChange(2);
    await flushPromises();
    wrapper.update();
    expect(wrapper).toMatchSnapshot();
  });

  it('renders A albums', async () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={[{ key: 'testKey' }]}>
        <AlbumsPage history={[]} />
      </MemoryRouter>
    );
    // Manually trigger the callback
    wrapper.find(AlbumsPage).instance().handleLetter('A');
    await flushPromises();
    wrapper.update();
    expect(wrapper).toMatchSnapshot();
  });

  it('renders 2006 albums', async () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={[{ key: 'testKey' }]}>
        <AlbumsPage history={[]} />
      </MemoryRouter>
    );
    // Manually trigger the callback
    wrapper.find(AlbumsPage).instance().handleYear(2006);
    await flushPromises();
    wrapper.update();
    expect(wrapper).toMatchSnapshot();
  });

  it('renders Pop albums', async () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={[{ key: 'testKey' }]}>
        <AlbumsPage history={[]} />
      </MemoryRouter>
    );
    // Manually trigger the callback
    wrapper.find(AlbumsPage).instance().handleGenre('Pop');
    await flushPromises();
    wrapper.update();
    expect(wrapper).toMatchSnapshot();
  });

  it('renders random albums', async () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={[{ key: 'testKey' }]}>
        <AlbumsPage history={[]} />
      </MemoryRouter>
    );
    // Manually trigger the callback
    wrapper.find(AlbumsPage).instance().handleRandom();
    await flushPromises();
    wrapper.update();
    expect(wrapper).toMatchSnapshot();
  });

  it('renders ABC search match', async () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={[{ key: 'testKey' }]}>
        <AlbumsPage history={[]} />
      </MemoryRouter>
    );
    // Manually trigger the callback
    wrapper.find(AlbumsPage).instance().handleSearchChange('ABC');
    await flushPromises();
    wrapper.update();
    expect(wrapper).toMatchSnapshot();
  });
});
