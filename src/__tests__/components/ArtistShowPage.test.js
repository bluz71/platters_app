import React from 'react'
import { shallow } from 'enzyme'
import { flushPromises } from '../../helpers/testUtils'
import ArtistShowPage, {
  ARTIST_ALBUMS_SORT_BY
} from '../../components/ArtistShowPage'

describe('<ArtistShowPage />', () => {
  it('renders artist show page', async () => {
    const match = { params: { id: 'abc' } }
    const wrapper = shallow(<ArtistShowPage match={match} location />)
    await flushPromises()
    wrapper.update()
    expect(wrapper).toMatchSnapshot()
  })

  it('renders sorted albums when newest is clicked', async () => {
    const match = { params: { id: 'abc' } }
    const wrapper = shallow(<ArtistShowPage match={match} location />)
    await flushPromises()
    wrapper.instance().handleAlbumsOrder(ARTIST_ALBUMS_SORT_BY.newest)
    await flushPromises()
    wrapper.update()
    expect(wrapper).toMatchSnapshot()
  })

  it('renders sorted albums when oldest is clicked', async () => {
    const match = { params: { id: 'abc' } }
    const wrapper = shallow(<ArtistShowPage match={match} location />)
    await flushPromises()
    wrapper.instance().handleAlbumsOrder(ARTIST_ALBUMS_SORT_BY.oldest)
    await flushPromises()
    wrapper.update()
    expect(wrapper).toMatchSnapshot()
  })

  it('renders sorted albums when longest is clicked', async () => {
    const match = { params: { id: 'abc' } }
    const wrapper = shallow(<ArtistShowPage match={match} location />)
    await flushPromises()
    wrapper.instance().handleAlbumsOrder(ARTIST_ALBUMS_SORT_BY.longest)
    await flushPromises()
    wrapper.update()
    expect(wrapper).toMatchSnapshot()
  })

  it('renders sorted albums when name is clicked', async () => {
    const match = { params: { id: 'abc' } }
    const wrapper = shallow(<ArtistShowPage match={match} location />)
    await flushPromises()
    wrapper.instance().handleAlbumsOrder(ARTIST_ALBUMS_SORT_BY.name)
    await flushPromises()
    wrapper.update()
    expect(wrapper).toMatchSnapshot()
  })

  it('renders all artist comments when scrolled', async () => {
    const match = { params: { id: 'abc' } }
    const wrapper = shallow(<ArtistShowPage match={match} location />)
    await flushPromises()
    wrapper.instance().handlePageEnd()
    await flushPromises()
    wrapper.update()
    expect(wrapper).toMatchSnapshot()
  })

  it('handles invalid artist', async () => {
    const match = { params: { id: 'null' } }
    const wrapper = shallow(<ArtistShowPage match={match} location />)
    await flushPromises()
    wrapper.update()
    expect(wrapper).toMatchSnapshot()
  })
})
