import React from 'react'
import { shallow } from 'enzyme'
import ArtistsSidebar from '../../components/ArtistsSidebar'

const mostRecentAlbums = () => {
  return [
    {
      id: 1,
      title: 'ABC',
      artist: 'ABC',
      artist_slug: 'abc',
      album_slug: 'abc',
      cover_url: 'http://localhost:3000/small_ABC--ABC.jpg'
    },
    {
      id: 2,
      title: 'DEF',
      artist: 'DEF',
      artist_slug: 'def',
      album_slug: 'def',
      cover_url: 'http://localhost:3000/small_DEF--DEF.jpg'
    }
  ]
}

const mostRecentComments = () => {
  return [
    {
      id: 1,
      created_at: '<time>March 8, 2018 2:55am</time>',
      user_name: 'fred',
      user_slug: 'fred',
      gravatar_url: 'https://gravatar.com/avatar/88884e5cb90c02031f031bc',
      name: 'abc',
      path: 'artist/abc'
    },
    {
      id: 2,
      created_at: '<time>March 7, 2018 4:22am</time>',
      user_name: 'jon',
      user_slug: 'jon',
      gravatar_url: 'https://gravatar.com/avatar/88884e5cb90c02031f031bc',
      name: 'def',
      path: 'artist/def/album/def'
    }
  ]
}

describe('<ArtistsSidebar />', () => {
  it('renders without crashing', () => {
    shallow(<ArtistsSidebar mostRecentAlbums={[]} mostRecentComments={[]} />)
  })

  it('renders a sidebar', () => {
    const wrapper = shallow(
      <ArtistsSidebar
        mostRecentAlbums={mostRecentAlbums()}
        mostRecentComments={mostRecentComments()}
      />
    )

    expect(wrapper).toMatchSnapshot()
  })
})
