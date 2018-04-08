import React from 'react';
import { shallow, mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import AlbumsList from '../../components/AlbumsList';

const albums = () => {
  return [
    {
      'id': 1,
      'title': 'ABC',
      'artist': 'ABC',
      'artist_slug': 'abc',
      'album_slug': 'abc',
      'cover_url': 'http://localhost:3000/small_ABC--ABC.jpg',
      'tracks': [
        '1. First',
        '2. Second'
      ]
    },
    {
      'id': 2,
      'title': 'DEF',
      'artist': 'DEF',
      'artist_slug': 'def',
      'album_slug': 'def',
      'cover_url': 'http://localhost:3000/small_DEF--DEF.jpg',
      'tracks': [
        '1. First',
        '2. Second',
        '3. Third'
      ]
    }
  ];
};

describe('<AlbumsList />', () => {
  it('renders without crashing', () => {
    shallow(<AlbumsList albums={[]} />);
  });

  it('renders a list of albums', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={[ { key: 'testKey' } ]}>
        <AlbumsList albums={albums()} />
      </MemoryRouter>
    );
    expect(wrapper).toMatchSnapshot();
  });
});
