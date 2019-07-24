import React from 'react'
import { Col, ListGroup, ListGroupItem } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import '../styles/ArtistsSidebar.css'

const renderAlbums = albums =>
  albums.map(album => (
    <ListGroupItem key={album.id} className='album'>
      <h5>
        <Link to={`/artist/${album.artist_slug}/album/${album.album_slug}`}>
          {album.title}
        </Link>
      </h5>
      <h5>
        by <Link to={`/artist/${album.artist_slug}`}>{album.artist}</Link>
      </h5>
      <Link to={`/artist/${album.artist_slug}/album/${album.album_slug}`}>
        <img
          className='img-responsive center-block'
          src={album.cover_url}
          alt={album.title}
        />
      </Link>
    </ListGroupItem>
  ))

const renderComments = comments =>
  comments.map(comment => (
    <ListGroupItem key={comment.id} className='comment'>
      <h5 dangerouslySetInnerHTML={{ __html: `${comment.created_at} by` }} />
      <h5>
        <Link to={`/comments/${comment.user_slug}`}>{comment.user_name}</Link>
      </h5>
      <Link to={`/comments/${comment.user_slug}`}>
        <img
          className='img-responsive center-block'
          src={comment.gravatar_url}
          alt={comment.user_name}
        />
      </Link>
      <h5>
        in{' '}
        <Link
          to={{
            pathname: comment.path,
            state: { scrollToComments: true }
          }}
        >
          {comment.name}
        </Link>
      </h5>
    </ListGroupItem>
  ))

const ArtistsSidebar = ({ mostRecentAlbums, mostRecentComments }) => {
  if (mostRecentAlbums.length === 0) {
    return <aside />
  }

  return (
    <aside className='ArtistsSidebar'>
      <Col md={2}>
        <section className='panel panel-default'>
          <div className='panel-heading'>
            <h4 className='panel-title'>New Albums</h4>
          </div>
          <ListGroup>{renderAlbums(mostRecentAlbums)}</ListGroup>
        </section>
        <section className='panel panel-default'>
          <div className='panel-heading'>
            <h4 className='panel-title'>New Comments</h4>
          </div>
          <ListGroup>{renderComments(mostRecentComments)}</ListGroup>
        </section>
      </Col>
    </aside>
  )
}

export default ArtistsSidebar
