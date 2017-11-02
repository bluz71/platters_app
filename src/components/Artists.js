// @flow
import React, { Component } from 'react';
import axios from 'axios';

const ARTISTS_URL = 'http://localhost:3000/artists.json';

class Artists extends Component {
  constructor(props) {
    super(props);

    this.state = {
      artists: []
    }
  }

  componentDidMount() {
    axios.get(ARTISTS_URL).then(response => {
      console.log(response);
    });
  }

  render() {
    return (
      <h2>Artists Page</h2>
    );
  }
}

export default Artists;
