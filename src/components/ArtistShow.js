// @flow
import React from 'react';

const ArtistShow = (props) => {
  const { id } = props.match.params;

  return (
    <h1>Artist Show Page for {id}</h1>
  );
};

export default ArtistShow;
