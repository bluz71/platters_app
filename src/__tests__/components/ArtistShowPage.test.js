import React from 'react';
import { shallow } from 'enzyme';
import flushPromises from '../../helpers/flushPromises';
import ArtistShowPage from '../../components/ArtistShowPage';

describe('<ArtistShowPage />', () => {
  it('renders artist show page', async () => {
    const match = { params: { id: 'abc' } };
    const wrapper = shallow(<ArtistShowPage match={match} location />);
    await flushPromises();
    wrapper.update();
    expect(wrapper).toMatchSnapshot();
  });
});
