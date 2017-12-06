// @flow
import React, { Component } from 'react';
import axios from 'axios';
import { Col, PageHeader } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';
import pluralize from 'pluralize';
import numeral from 'numeral';
import queryString from 'query-string';
import _ from 'lodash';
import '../styles/Albums.css';
import { API_HOST } from '../config';
import Paginator from './Paginator';

const ALBUMS_ENDPOINT = `${API_HOST}/albums.json`;

class Albums extends Component {
  constructor(props) {
    super(props);

    // params is not React state since we do not want to re-render when it
    // changes; just use an instance variable instead.
    this.params = {};
    this.starting = true;

    this.state = {
      albums: [],
      pagination: {}
    };
  }

  componentDidMount() {
    this.getAlbums();
  }

  handlePageChange = (pageNumber) => {
    _.merge(this.params, { page: pageNumber });
    this.getAlbums();
  }

  handleAll = () => {
    this.params = {};
    this.getAlbums();
  }

  handleYear = (year) => {
    this.params = { year: year };
    this.getAlbums();
  }

  handleGenre = (genre) => {
    this.params = { genre: genre };
    this.getAlbums();
  }

  handleLetter = (letter) => {
    this.params.letter = letter;
    this.getAlbums();
  }

  albumsURL() {
    const params = queryString.stringify(this.params);

    if (params.length > 0) {
      return `${ALBUMS_ENDPOINT}?${params}`;
    }
    else {
      return ALBUMS_ENDPOINT;
    }
  }

  getAlbums() {
    axios.get(this.albumsURL())
      .then(response => {
        this.setState({
          albums: response.data.albums,
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
    const albumsCount = numeral(count).format('0,0');
    const genre = this.params.hasOwnProperty('genre') ? this.params.genre : '';
    const year = this.params.hasOwnProperty('year') ? ` from ${this.params.year}` : '';

    return (
      <PageHeader>
        Albums {count > 0 && <small>({albumsCount} {genre} {pluralize('Album', count)}{year})</small>}
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

  renderAlbums() {
    if (this.state.albums.length === 0 && !this.starting) {
      return <h4>No matching albums</h4>;
    }

    return (
      this.state.albums.map(album => {
        return (
          <Col key={album.id} md={6}>
            <div className="Album">
              <h2>
                <Link to={`/artist/${album.artist_slug}/album/${album.album_slug}`}>{album.title}</Link>
              </h2>
              <h3>
                by <Link to={`/artist/${album.artist_slug}`}>{album.artist}</Link> <small>({album.tracks_count} {pluralize('Track', album.tracks_count)})</small>
              </h3>
              <div className="icon">
                <a onClick={() => this.handleYear(album.year)}><FontAwesome name="calendar" /> {album.year}</a>
                <a onClick={() => this.handleGenre(album.genre)}><FontAwesome name="tag" className="spacer-left-xs" /> {album.genre}</a>
                <FontAwesome name="comment-o" className="spacer-left-xs" /> {album.comments_count}
              </div>
              <Link to={`/artist/${album.artist_slug}/album/${album.album_slug}`}>
                <img className="img-responsive" src={album.cover_url} alt={album.title} />
              </Link>
              <ul>
                {album.tracks.map((track, index) => <li key={index}>{track}</li>)}
              </ul>
            </div>
          </Col>
        );
      })
    );
  }

  renderPaginator() {
    if (this.state.pagination.total_pages > 1) {
      return (
        <Col md={8}>
          <Paginator pagination={this.state.pagination} onPageChange={this.handlePageChange} />
        </Col>
      );
    }
  }

  render() {
    window.scrollTo(0,0);

    return (
      <div className="Albums">
        {this.renderHeader()}
        {this.renderFilters()}
        {this.renderAlbums()}
        {this.renderPaginator()}
      </div>
    );
  }
}

export default Albums;
