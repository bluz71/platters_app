// @flow
import React, { Component } from 'react';
import axios from 'axios';
import { API_HOST } from '../config';

const ARTISTS_URL = `${API_HOST}/artists.json`;

class Artists extends Component {
  constructor(props) {
    super(props);

    this.state = {
      artists: [],
      pagination: {}
    };
  }

  componentDidMount() {
    axios.get(ARTISTS_URL)
      .then(response => {
        this.setState({
          artists: response.data.artists,
          pagination: response.data.pagination
        });
      })
      .catch(error => console.log('error'));
  }

  renderArtists() {
    return (
      this.state.artists.map(artist => <li key={artist.id}>{artist.name}</li>)
    );
  }

  render() {
    return (
      <div>
        <h2>Artists Page</h2>
        <h3>{this.state.artists.length}</h3>
        <ul>{this.renderArtists()}</ul>
      </div>
    );
  }
}

export default Artists;
