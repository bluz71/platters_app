// @flow
import React, { Component } from 'react';
import axios from 'axios';
import { API_HOST } from '../config';

const ARTISTS_URL = `${API_HOST}/artists.json`;

class Artists extends Component {
  constructor(props) {
    super(props);

    this.state = {
      artists: []
    };
  }

  componentDidMount() {
    axios.get(ARTISTS_URL)
      .then(response => console.log(response))
      .catch(error => console.log('error'));
  }

  render() {
    return (
      <h2>Artists Page</h2>
    );
  }
}

export default Artists;
