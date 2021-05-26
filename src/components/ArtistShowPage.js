import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import FontAwesome from 'react-fontawesome'
import { Row, Col, PageHeader } from 'react-bootstrap'
import axios from 'axios'
import numeral from 'numeral'
import pluralize from 'pluralize'
import { API_HOST } from '../config'
import PageProgress from '../helpers/PageProgress'
import infiniteScroll from '../helpers/infiniteScroll'
import { toastAlert } from '../helpers/toastMessage'
import { appAuth } from '../lib/appAuth'
import ArtistAlbumsList from './ArtistAlbumsList'
import CommentsList from './CommentsList'
import NewComment from './NewComment'
import '../styles/ArtistShowPage.css'

const ARTIST_ALBUMS_SORT_BY = {
  newest: 'newest',
  oldest: 'oldest',
  longest: 'longest',
  name: 'name'
}

class ArtistShowPage extends Component {
  constructor (props) {
    super(props)

    this.artistSlug = props.match.params.id
    this.artistEndPoint = `${API_HOST}/${this.artistSlug}.json`
    this.loaded = false
    this.albumsSortBy = ARTIST_ALBUMS_SORT_BY.newest
    this.albumsEndPoint = `${API_HOST}/artists/${this.artistSlug}/albums.json`
    this.commentsEndPoint = `${API_HOST}/${this.artistSlug}/comments.json`
    this.waiting = false // For comments when infinite-scrolling.
    this.scrollToComments =
      (props.location.state && props.location.state.scrollToComments) || false
    this.pageProgress = new PageProgress()

    // Note, use a Map for comments since it preserves insertion order whilst
    // allowing O(1) comment deletion.
    this.state = {
      artist: {},
      albums: [],
      comments: new Map(),
      commentsPagination: {},
      commentsCount: 0,
      notFound: false,
      error: null
    }

    // Bind 'this' for callback functions.
    this.handleYear = this.handleYear.bind(this)
    this.handleGenre = this.handleGenre.bind(this)
    this.handleAlbumsOrder = this.handleAlbumsOrder.bind(this)
    this.handleScroll = this.handleScroll.bind(this)
    this.handlePageEnd = this.handlePageEnd.bind(this)
    this.handleDeleteComment = this.handleDeleteComment.bind(this)
    this.handleNewComment = this.handleNewComment.bind(this)
  }

  componentDidMount () {
    window.onscroll = this.handleScroll
    this.getArtist(true)
  }

  componentWillUnmount () {
    window.onscroll = null
  }

  handleYear (year) {
    const params = { year }
    this.props.history.push('/albums', params)
  }

  handleGenre (genre) {
    const params = { genre }
    this.props.history.push('/albums', params)
  }

  handleAlbumsOrder (order) {
    const albumsEndPoint = `${this.albumsEndPoint}?${order}=true`
    this.albumsSortBy = order
    this.getAlbums(albumsEndPoint)
  }

  handleScroll () {
    infiniteScroll(this.state.commentsPagination, this.handlePageEnd)
  }

  handlePageEnd () {
    // Page has been scrolled to the end, hence retrieve the next set of
    // comments.

    // Disable scroll handling whilst records are being retrieved.
    window.onscroll = null
    const commentsPageEndPoint = `${this.commentsEndPoint}?page=${this.state.commentsPagination.next_page}`
    this.waiting = true
    this.forceUpdate() // Render spinner
    this.getComments(commentsPageEndPoint)
  }

  handleDeleteComment (commentId) {
    // Note, we need to copy the comments hash map since we must not mutate
    // React state directly.
    const comments = new Map([...this.state.comments])
    // Delete the comment of interest.
    comments.delete(commentId)
    // Update the count.
    const commentsCount = this.state.commentsCount - 1
    // Apply the updated state.
    this.setState({ comments, commentsCount })
  }

  handleNewComment (comment) {
    // Note, we need to copy the comments hash map since we must not mutate
    // React state directly.
    //
    // Prepend the comment of interest.
    const comments = new Map([
      ...[[comment.id, comment]],
      ...this.state.comments
    ])
    // Update the count.
    const commentsCount = this.state.commentsCount + 1
    // Apply the updated state.
    this.setState({ comments, commentsCount })
  }

  getArtist (scrollToTop = false) {
    axios
      .get(this.artistEndPoint)
      .then(response => {
        this.loaded = this.pageProgress.done()
        document.title = response.data.artist.name
        this.setState({
          artist: response.data.artist,
          albums: response.data.albums,
          comments: new Map(response.data.comments.map(c => [c.id, c])),
          commentsPagination: response.data.comments_pagination,
          commentsCount: response.data.comments_pagination.total_count
        })
        if (this.scrollToComments) {
          this.scrollToComments = false
          this.commentsAnchor.scrollIntoView()
        } else if (scrollToTop) {
          window.scrollTo(0, 0)
        }
      })
      .catch(error => {
        this.pageProgress.done()
        if (error.response && error.response.status === 404) {
          this.setState({ notFound: true })
        } else {
          this.setState({ error: error })
        }
      })
  }

  getAlbums (albumsEndPoint) {
    axios
      .get(albumsEndPoint)
      .then(response => {
        this.setState({ albums: response.data.albums })
      })
      .catch(error => {
        this.setState({ error: error })
      })
  }

  getComments (commentsEndPoint) {
    axios
      .get(commentsEndPoint)
      .then(response => {
        this.waiting = false
        if (!window.onscroll) {
          // Re-enable scroll handling now that the records have been
          // retrieved.
          window.onscroll = this.handleScroll
        }
        this.setState({
          comments: new Map([
            ...this.state.comments,
            ...response.data.comments.map(c => [c.id, c])
          ]),
          commentsPagination: response.data.pagination
        })
      })
      .catch(error => {
        this.setState({ error: error })
      })
  }

  artistRetrieved () {
    if (!this.loaded || this.state.notFound || this.state.error) {
      return false
    } else {
      return true
    }
  }

  renderHeader () {
    return <PageHeader>{this.state.artist.name}</PageHeader>
  }

  renderWikipedia (wikipedia) {
    if (!wikipedia) {
      return
    }

    const wikipediaURL = `https://www.wikipedia.org/wiki/${wikipedia}`

    return (
      <a href={wikipediaURL} target='_blank' rel='noopener noreferrer'>
        Wikipedia
      </a>
    )
  }

  renderWebsite (website, websiteLink) {
    if (!website) {
      return <div className='spacer-bottom-sm' />
    }

    return (
      <div className='website'>
        <span className='icon spacer-right-xxs'>
          <FontAwesome name='globe' />
        </span>
        <a href={website} target='_blank' rel='noopener noreferrer'>
          {websiteLink}
        </a>
      </div>
    )
  }

  renderArtist () {
    const { description, wikipedia, website } = this.state.artist
    const websiteLink = this.state.artist.website_link

    return (
      <div className='description'>
        <p>{description} </p>
        {this.renderWikipedia(wikipedia)}
        {this.renderWebsite(website, websiteLink)}
      </div>
    )
  }

  albumsSortByActivity (sortBy) {
    if (this.albumsSortBy === sortBy) {
      return 'active'
    }
  }

  renderAlbumsList (albumsCount) {
    if (albumsCount === 0) {
      return
    }

    const artistSlug = this.state.artist.slug

    return (
      <div>
        <ul className='albums-order'>
          <li
            className={this.albumsSortByActivity(ARTIST_ALBUMS_SORT_BY.newest)}
            onClick={() => this.handleAlbumsOrder(ARTIST_ALBUMS_SORT_BY.newest)}
          >
            Newest
          </li>
          <li
            className={this.albumsSortByActivity(ARTIST_ALBUMS_SORT_BY.oldest)}
            onClick={() => this.handleAlbumsOrder(ARTIST_ALBUMS_SORT_BY.oldest)}
          >
            Oldest
          </li>
          <li
            className={this.albumsSortByActivity(ARTIST_ALBUMS_SORT_BY.longest)}
            onClick={() => this.handleAlbumsOrder(ARTIST_ALBUMS_SORT_BY.longest)}
          >
            Longest
          </li>
          <li
            className={this.albumsSortByActivity(ARTIST_ALBUMS_SORT_BY.name)}
            onClick={() => this.handleAlbumsOrder(ARTIST_ALBUMS_SORT_BY.name)}
          >
            Name
          </li>
        </ul>
        <ArtistAlbumsList
          albums={this.state.albums}
          artistSlug={artistSlug}
          onYear={this.handleYear}
          onGenre={this.handleGenre}
        />
      </div>
    )
  }

  renderAlbums () {
    const albumsCount = this.state.albums.length

    return (
      <div className='albums'>
        <PageHeader>
          Albums{' '}
          <small>
            ({albumsCount} {pluralize('Album', albumsCount)})
          </small>
        </PageHeader>
        {this.renderAlbumsList()}
        <div className='spacer-bottom-lg' />
      </div>
    )
  }

  renderNewComment () {
    if (!appAuth.isLoggedIn()) {
      return
    }

    return (
      <NewComment
        resourcePath={this.artistSlug}
        onNewComment={this.handleNewComment}
      />
    )
  }

  renderCommentsList (count) {
    if (count === 0) {
      return <h4>No comments have been posted for this artist</h4>
    }

    return (
      <CommentsList
        comments={this.state.comments}
        onDeleteComment={this.handleDeleteComment}
        shortHeader
      />
    )
  }

  renderSpinner () {
    if (this.waiting) {
      return (
        <div className='WaitingSpinner'>
          <FontAwesome name='spinner' spin pulse />
        </div>
      )
    }
  }

  renderComments () {
    const count = this.state.commentsCount
    const commentsCount = numeral(count).format('0,0')

    return (
      <div
        className='comments'
        ref={commentsAnchor => (this.commentsAnchor = commentsAnchor)}
      >
        <PageHeader>
          Comments{' '}
          <small>
            ({commentsCount} {pluralize('Comment', count)})
          </small>
        </PageHeader>
        {this.renderNewComment()}
        {this.renderCommentsList(count)}
        {this.renderSpinner()}
      </div>
    )
  }

  render () {
    this.pageProgress.start()

    if (this.state.notFound) {
      toastAlert(`The artist ${this.artistSlug} does not exist`)
      return <Redirect to='/artists' />
    }
    if (this.state.error) {
      toastAlert('Connection failure, please retry again soon')
      return <Redirect to='/' />
    }

    if (!this.artistRetrieved()) {
      return null
    }

    return (
      <Row>
        <Col md={10} mdOffset={1} className='ArtistShow'>
          {this.renderHeader()}
          {this.renderArtist()}
          {this.renderAlbums()}
          {this.renderComments()}
        </Col>
      </Row>
    )
  }
}

export default ArtistShowPage
export { ARTIST_ALBUMS_SORT_BY }
