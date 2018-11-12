import React from 'react';
import PropTypes from 'prop-types';
import pluralize from 'pluralize';
import { Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';
import '../styles/AlbumsList.css';

const renderAlbums = (albums, onYear, onGenre) =>
  albums.map((album) => (
    <Col key={album.id} md={6}>
      <div className="Album">
        <h2>
          <Link to={`/artist/${album.artist_slug}/album/${album.album_slug}`}>
            {album.title}
          </Link>
        </h2>
        <h3>
          by <Link to={`/artist/${album.artist_slug}`}>{album.artist}</Link>{' '}
          <small>
            ({album.tracks_count} {pluralize('Track', album.tracks_count)})
          </small>
        </h3>
        <div className="icon">
          <span onClick={() => onYear(album.year)}>
            <FontAwesome name="calendar" /> {album.year}
          </span>
          <span onClick={() => onGenre(album.genre)}>
            <FontAwesome name="tag" className="spacer-left-xsm" /> {album.genre}
          </span>
          <Link
            to={{
              pathname: `/artist/${album.artist_slug}/album/${
                album.album_slug
              }`,
              state: { scrollToComments: true }
            }}
          >
            <FontAwesome name="comment-o" className="spacer-left-xsm" />{' '}
            {album.comments_count}
          </Link>
        </div>
        <Link to={`/artist/${album.artist_slug}/album/${album.album_slug}`}>
          <img
            className="img-responsive"
            src={album.cover_url}
            alt={album.title}
          />
        </Link>
        <ul>
          {album.tracks.map((track, index) => (
            <li key={index}>{track}</li>
          ))}
        </ul>
      </div>
    </Col>
  ));

const AlbumsList = ({ albums, onYear, onGenre }) => {
  return (
    <div className="AlbumsList">{renderAlbums(albums, onYear, onGenre)}</div>
  );
};

AlbumsList.propTypes = {
  albums: PropTypes.array,
  onYear: PropTypes.func,
  onGenre: PropTypes.func
};

export default AlbumsList;
