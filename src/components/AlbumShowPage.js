import React from 'react';

const AlbumShowPage = (props) => {
  const { artist_id, album_id } = props.match.params;

  return (
    <h1>Album Show Page for {album_id} by {artist_id}</h1>
  );
};

export default AlbumShowPage;
