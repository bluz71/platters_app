// @flow
import React, { Component } from 'react';
import axios from 'axios';
import { Row, Col, PageHeader } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';
import pluralize from 'pluralize';
import '../styles/Artists.css';
import { API_HOST } from '../config';
import Paginator from './Paginator';

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
      });
  }

  onPageChange = (pageNumber) => {
    axios.get(`${ARTISTS_URL}?page=${pageNumber}`)
      .then(response => {
        this.setState({
          artists: response.data.artists,
          pagination: response.data.pagination
        });
      });
  }

  renderHeader() {
    const count = this.state.pagination.total_count;
    return (
      <PageHeader>
        <div className="pull-left">
          <h1>
            Artists <small>({count} {pluralize('Artist', count)})</small>
          </h1>
        </div>
        <div className="clearfix"></div>
      </PageHeader>
    );
  }

  renderArtists() {
    return (
      this.state.artists.map(artist => {
        return (
          <div key={artist.id} className="Artist">
            <Link to="/">
              <h2>{artist.name}</h2>
              <p>{artist.description}</p>
              <span className="icon">
                <FontAwesome name="music" /> {artist.albums_count}
                <FontAwesome name="comment-o" className="spacer-left-xs" /> {artist.comments_count}
              </span>
            </Link>
          </div>
        );
      })
    );
  }

  render() {
    window.scrollTo(0,0);

    return (
      <Row>
        <Col md={10}>
          <div className="Artists">
            {this.renderHeader()}
            {this.renderArtists()}
            <Paginator pagination={this.state.pagination} onPageChange={this.onPageChange} />
          </div>
        </Col>
      </Row>
    );
  }
}

export default Artists;
