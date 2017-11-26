// @flow
import React, { Component } from 'react';
import axios from 'axios';
import { PageHeader } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import pluralize from 'pluralize';
import numeral from 'numeral';
import '../styles/Albums.css';
import { API_HOST } from '../config';
import Paginator from './Paginator';

const ALBUMS_URL = `${API_HOST}/albums.json`;

class Albums extends Component {
  constructor(props) {
    super(props);

    this.state = {
      albums: [],
      pagination: {}
    };
  }

  componentDidMount() {
    axios.get(ALBUMS_URL)
      .then(response => {
        this.setState({
          albums: response.data.albums,
          pagination: response.data.pagination
        });
      });
  }

  onPageChange = (pageNumber) => {
    axios.get(`${ALBUMS_URL}?page=${pageNumber}`)
      .then(response => {
        this.setState({
          albums: response.data.albums,
          pagination: response.data.pagination
        });
      });
  }

  renderHeader() {
    const count = this.state.pagination.total_count;
    const albumsCount = numeral(count).format('0,0');

    return (
      <PageHeader>
        <h1>
          Albums <small>({albumsCount} {pluralize('Album', count)})</small>
        </h1>
      </PageHeader>
    );
  }

  renderAlbums() {
    return (
      this.state.albums.map(album => <li key={album.id}>{album.title}</li>)
    );
  }

  render() {
    return (
      <div className="Albums">
        {this.renderHeader()}
        <ul>{this.renderAlbums()}</ul>
        <Paginator pagination={this.state.pagination} onPageChange={this.onPageChange} />
      </div>
    );
  }
}

export default Albums;
