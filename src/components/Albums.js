// @flow
import React, { Component } from 'react';
import axios from 'axios';
import { Col, PageHeader } from 'react-bootstrap';
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
        Albums <small>({albumsCount} {pluralize('Album', count)})</small>
      </PageHeader>
    );
  }

  renderAlbums() {
    if (this.state.albums.length === 0) {
      return <h4>No matching albums</h4>
    }

    return (
      this.state.albums.map(album => {
        return (
          <Col key={album.id} md={6}>
            <div className="Album">
              <h2>{album.title}</h2>
              <h3>by {album.artist} <small>({album.tracks_count} {pluralize('Track', album.tracks_count)})</small></h3>
              <div className="icon">
                <FontAwesome name="calendar" /> {album.year}
                <FontAwesome name="tag" className="spacer-left-xs" /> {album.genre}
                <FontAwesome name="comment-o" className="spacer-left-xs" /> {album.comments_count}
              </div>
              <img className="img-responsive" src={album.cover} />
            </div>
          </Col>
        );
      })
    );
  }

  render() {
    window.scrollTo(0,0);

    return (
      <div className="Albums">
        {this.renderHeader()}
        {this.renderAlbums()}
        <Col md={8}>
          <Paginator pagination={this.state.pagination} onPageChange={this.onPageChange} />
        </Col>
      </div>
    );
  }
}

export default Albums;
