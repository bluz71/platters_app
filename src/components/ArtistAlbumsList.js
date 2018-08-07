import React from 'react';
// import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';
import '../styles/ArtistAlbumsList.css';

const renderTracks = (tracks) => (
  tracks.map((track, index) => <li key={index}>{track} </li>)
);

const renderAlbums = (albums, artistSlug, onYear, onGenre) => (
  albums.map(album =>
    <div key={album.id} className="album">
      <Link to={`/artist/${artistSlug}/album/${album.slug}`}>
        <img className="img-responsive" src={album.cover_url} alt={album.title} />
      </Link>
      <div className="title">
        <Link to={`/artist/${artistSlug}/album/${album.slug}`}>
          <h2>{album.title}</h2>
        </Link>
        <span className="icon">
          <a onClick={() => onYear(album.year)}>
            <FontAwesome name="calendar" /> {album.year}
          </a>
          <a onClick={() => onGenre(album.genre)}>
            <FontAwesome name="tag" className="spacer-left-xsm" /> {album.genre}
          </a>
          <Link to={{
            pathname: `/artist/${artistSlug}/album/${album.slug}`,
            state: { scrollToComments: true }
          }}>
            <FontAwesome name="comment-o" className="spacer-left-xsm" /> {album.comments_count}
          </Link>
        </span>
      </div>
      <h3 className="album-details">
        <small>
          {`(${album.tracks_count} Tracks, Time ${album.total_duration})`}
        </small>
      </h3>
      <ul>{renderTracks(album.tracks_summary)}</ul>
    </div>
  )
);

const ArtistAlbumsList = ({ albums, artistSlug, onYear, onGenre }) => {
  return (
    <div className="ArtistAlbums">
      {renderAlbums(albums, artistSlug, onYear, onGenre)}
    </div>
  );
};

//ArtistAlbumsList.propTypes = {
//};

export default ArtistAlbumsList;
