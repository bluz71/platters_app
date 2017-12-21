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
    this.mounted = false;

    this.state = {
      albums: [],
      pagination: {},
      error: null
    };
  }

  componentDidMount() {
    window.onpopstate = this.handleBackButton;
    this.applyState();
  }

  componentWillUnmount() {
    window.onpopstate = null;
  }

  shouldComponentUpdate(nextProps) {
    // Location change indicates either a direct 'this.props.history.push' or
    // back/forward in a browser. In both circumstances we do NOT want to
    // re-render since a GET for a new set of resources will immediately occur
    // after which will result in a re-render. Basically we only want to render
    // once upon a state change, not twice, hence we can safely ignore location
    // changes.
    return _.isEqual(this.props.location, nextProps.location);
  }

  handleBackButton = (event) => {
    event.preventDefault();
    this.applyState();
  }

  handlePageChange = (pageNumber) => {
    const newParams = { ...this.params, page: pageNumber };
    this.applyParams(newParams);
  }

  handleAll = () => {
    const newParams = {};
    this.applyParams(newParams);
  }

  handleYear = (year) => {
    const newParams = { year };
    this.applyParams(newParams);
  }

  handleGenre = (genre) => {
    const newParams = { genre };
    this.applyParams(newParams);
  }

  handleLetter = (letter) => {
    const newParams = _.omit(this.params, ['page']);
    newParams.letter = letter;
    this.applyParams(newParams);
  }

  // Apply state for back and forward transistion into/outof/within this
  // component.
  applyState() {
    if (this.props.history.location.state) {
      this.params = this.props.history.location.state;
    }
    else {
      this.params = {};
    }
    this.getAlbums();
  }

  // Apply paramaters and update resources only if they are changed.
  applyParams(newParams) {
    if (_.isEqual(this.params, newParams)) {
      // Nothing to do, new params have not changed, just return.
      return;
    }

    this.params = newParams;
    this.props.history.push('/albums', this.params);
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
        if (!this.mounted) {
          this.mounted = true;
        }
        this.setState({
          albums: response.data.albums,
          pagination: response.data.pagination,
          error: null
        });
        window.scrollTo(0,0);
      })
      .catch(error => {
        this.setState({
          error: error
        });
      });
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
        Albums {this.mounted && <small>({albumsCount} {genre} {pluralize('Album', count)}{year})</small>}
      </PageHeader>
    );
  }

  renderFilters() {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

    return (
      <div className="filters">
        <ul className="pagination pagination-sm">
          <li onClick={this.handleAll}><a>All</a></li>
          {letters.map(letter => <li onClick={() => this.handleLetter(letter)} key={letter} className={this.letterActivity(letter)}><a>{letter}</a></li>)}
        </ul>
      </div>
    );
  }

  renderAlbums() {
    if (this.state.error) {
      return <h4>Error retrieving albums</h4>;
    }

    if (this.mounted && this.state.albums.length === 0) {
      return <h4>No matching albums</h4>;
    }

    return (
      this.state.albums.map(album =>
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
      )
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
