import React from 'react';

const ArtistShowPage = (props) => {
  const { id } = props.match.params;

  return (
    <h1>Artist Show Page for {id}</h1>
  );
};

export default ArtistShowPage;
