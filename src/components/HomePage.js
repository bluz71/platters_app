import React, { Component } from 'react';
import axios from 'axios';
import { API_HOST } from '../config';

const HOME_ENDPOINT = `${API_HOST}/home.json`;

class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      albumOfTheDay: {},
      mostRecentAlbums: [],
      mostRecentComments: []
    };
  }

  componentDidMount() {
    this.getHome();
  }

  getHome() {
    axios.get(HOME_ENDPOINT)
      .then(response => {
        this.setState({
          albumOfTheDay: response.data.album_of_the_day,
          mostRecentAlbums: response.data.most_recent.albums,
          mostRecentComments: response.data.most_recent.comments
        });
      });
  }

  render() {
    return (
      <h1>Home Page</h1>
    );
  }
}

export default HomePage;
