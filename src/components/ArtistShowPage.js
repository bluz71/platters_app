import React, { Component } from 'react';

class ArtistShowPage extends Component {
  constructor(props) {
    super(props);

    this.artistSlug = props.match.params.id;
  }

  render() {
    return (
      <h1>Artist Show Page for {this.artistSlug}</h1>
    );
  }
}

export default ArtistShowPage;
