import React from 'react';
// import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import pluralize from 'pluralize';
import '../styles/ArtistAlbumsList.css';

const renderTracks = (tracks) => (
  tracks.map(track =>
    <li>{track} </li>
  )
);

const renderAlbums = (albums, artistSlug) => (
  albums.map(album =>
    <div key={album.id} className="album">
      <Link to={`/artist/${artistSlug}/album/${album.slug}`}>
        <img className="img-responsive" src={album.cover_url} alt={album.title} />
      </Link>
      <div className="title">
        <Link to={`/artist/${artistSlug}/album/${album.slug}`}>
          <h2>{album.title}</h2>
        </Link>
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

const ArtistAlbumsList = ({ albums, artistSlug }) => {
  return (
    <div className="ArtistAlbums">
      {renderAlbums(albums, artistSlug)}
    </div>
  );
};

//ArtistAlbumsList.propTypes = {
//};

export default ArtistAlbumsList;
