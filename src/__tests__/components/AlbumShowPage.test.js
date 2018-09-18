import React from 'react';
import { shallow } from 'enzyme';
import { flushPromises } from '../../helpers/testUtils';
import AlbumShowPage from '../../components/AlbumShowPage';

describe('<AlbumShowPage />', () => {
  it('renders album show page', async () => {
    const match = { params: { artist_id: 'abc', album_id: 'def' } };
    const wrapper = shallow(<AlbumShowPage match={match} location />);
    await flushPromises();
    wrapper.update();
    expect(wrapper).toMatchSnapshot();
  });

  it('renders all tracks when show all is clicked', async () => {
    const match = { params: { artist_id: 'abc', album_id: 'def' } };
    const wrapper = shallow(<AlbumShowPage match={match} location />);
    await flushPromises();
    wrapper.instance().handleTracksVisibility();
    wrapper.update();
    expect(wrapper).toMatchSnapshot();
  });

  it('renders less tracks when show less is clicked', async () => {
    const match = { params: { artist_id: 'abc', album_id: 'def' } };
    const wrapper = shallow(<AlbumShowPage match={match} location />);
    await flushPromises();
    wrapper.instance().handleTracksVisibility();
    wrapper.instance().handleTracksVisibility();
    wrapper.update();
    expect(wrapper).toMatchSnapshot();
  });

  it('renders all album comments when scrolled', async () => {
    const match = { params: { artist_id: 'abc', album_id: 'def' } };
    const wrapper = shallow(<AlbumShowPage match={match} location />);
    await flushPromises();
    wrapper.instance().handlePageEnd();
    await flushPromises();
    wrapper.update();
    expect(wrapper).toMatchSnapshot();
  });

  it('handles invalid album', async () => {
    const match = { params: { artist_id: 'abc', album_id: 'null' } };
    const wrapper = shallow(<AlbumShowPage match={match} location />);
    await flushPromises();
    wrapper.update();
    expect(wrapper).toMatchSnapshot();
  });
});
