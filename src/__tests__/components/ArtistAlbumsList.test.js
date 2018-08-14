import React from 'react';
import { shallow, mount } from 'enzyme';
import ArtistAlbumsList from '../../components/ArtistAlbumsList';

const albums = (args) => {
  return [
    {
      'id': 1,
      'title': 'ABC',
      'tracks_count': 2,
      'comments_count': 40,
      'total_duration': '15:31',
      'slug': 'abc',
      'cover_url': 'http://localhost:3000/small_XYZ--ABC.jpg',
      'year': 2008,
      'genre': 'Rock',
      'tracks_summary': [
        '1. First',
        '2. Second'
      ]
    },
    {
      'id': 2,
      'title': 'DEF',
      'tracks_count': 3,
      'comments_count': 26,
      'total_duration': '14:54',
      'slug': 'def',
      'cover_url': 'http://localhost:3000//small_XYZ--DEF.jpg',
      'year': 2014,
      'genre': 'Rock',
      'tracks_summary': [
        '1. First',
        '2. Second',
        '3. Third'
      ]
    }
  ];
};

describe('<ArtistAlbumsList />', () => {
  it('renders without crashing', () => {
    shallow(<ArtistAlbumsList albums={[]} />);
  });

  it('renders of a list of artist albums', () => {
    const wrapper = shallow(
      <ArtistAlbumsList albums={albums()} artistSlug="xyz" />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
