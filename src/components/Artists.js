// @flow
import React, { Component } from 'react';
import axios from 'axios';
import { Row, Col, PageHeader } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';
import pluralize from 'pluralize';
import numeral from 'numeral';
import queryString from 'query-string';
import _ from 'lodash';
import '../styles/Artists.css';
import { API_HOST } from '../config';
import Paginator from './Paginator';

const ARTISTS_ENDPOINT = `${API_HOST}/artists.json`;

class Artists extends Component {
  constructor(props) {
    super(props);

    // params is not React state since we do not want to re-render when it
    // changes; just use an instance variable instead.
    this.params = {};
    this.starting = true;

    this.state = {
      artists: [],
      pagination: {}
    };
  }

  componentDidMount() {
    this.getArtists();
  }

  handlePageChange = (pageNumber) => {
    _.merge(this.params, { page: pageNumber });
    this.getArtists();
  }

  handleAll = () => {
    this.params = {};
    this.getArtists();
  }

  handleLetter = (letter) => {
    this.params = { letter };
    this.getArtists();
  }

  artistsURL() {
    const params = queryString.stringify(this.params);

    if (params.length > 0) {
      return `${ARTISTS_ENDPOINT}?${params}`;
    }
    else {
      return ARTISTS_ENDPOINT;
    }
  }

  getArtists() {
    axios.get(this.artistsURL())
      .then(response => {
        this.setState({
          artists: response.data.artists,
          pagination: response.data.pagination
        });
      });
    if (this.starting) {
      this.starting = false;
    }
  }

  letterActivity(letter) {
    if (this.params.letter === letter) {
      return 'active';
    }
  }

  renderHeader() {
    const count = this.state.pagination.total_count;
    const artistsCount = numeral(count).format('0,0');

    return (
      <PageHeader>
        Artists {!this.starting && <small>({artistsCount} {pluralize('Artist', count)})</small>}
      </PageHeader>
    );
  }

  renderFilters() {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

    return (
      <div className="filters">
        <ul className="pagination pagination-sm">
          <li onClick={this.handleAll}><a>All</a></li>
          {letters.map((letter, index) => <li onClick={() => this.handleLetter(letter)} key={index} className={this.letterActivity(letter)}><a>{letter}</a></li>)}
        </ul>
      </div>
    );
  }

  renderArtists() {
    if (this.state.artists.length === 0 && !this.starting) {
      return <h4>No matching artists</h4>
    }

    return (
      this.state.artists.map(artist =>
        <div key={artist.id} className="Artist">
          <Link to={`/artist/${artist.slug}`}>
            <h2>{artist.name}</h2>
            <p>{artist.description}</p>
            <span className="icon">
              <FontAwesome name="music" /> {artist.albums_count}
              <FontAwesome name="comment-o" className="spacer-left-xs" /> {artist.comments_count}
            </span>
          </Link>
        </div>
      )
    );
  }

  renderPaginator() {
    if (this.state.pagination.total_pages > 1) {
      return (
        <Paginator pagination={this.state.pagination} onPageChange={this.handlePageChange} />
      );
    }
  }

  render() {
    window.scrollTo(0,0);

    return (
      <Row>
        <Col md={10}>
          <div className="Artists">
            {this.renderHeader()}
            {this.renderFilters()}
            {this.renderArtists()}
            {this.renderPaginator()}
          </div>
        </Col>
      </Row>
    );
  }
}

export default Artists;
