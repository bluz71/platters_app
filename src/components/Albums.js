import React, { Component } from 'react';
import axios from 'axios';
import { Col, PageHeader } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';
import pluralize from 'pluralize';
import numeral from 'numeral';
import queryString from 'query-string';
import _ from 'lodash';
import { VelocityTransitionGroup } from 'velocity-react';
import NProgress from 'nprogress';
import '../styles/Albums.css';
import { API_HOST } from '../config';
import Search from './Search';
import Paginator from './Paginator';

const ALBUMS_ENDPOINT = `${API_HOST}/albums.json`;

class Albums extends Component {
  constructor(props) {
    super(props);

    // params is not React state since we do not want to re-render when it
    // changes; just use an instance variable instead.
    this.params = {};
    this.loaded = false;
    this.searching = false;

    this.state = {
      albums: [],
      pagination: {},
      error: null
    };
  }

  componentDidMount() {
    window.onpopstate = this.handlePopState;
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

  handlePopState = (event) => {
    event.preventDefault();
    this.applyState();
  }

  handlePageChange = (page) => {
    const newParams = { ...this.params, page };
    this.applyParams(newParams);
  }

  handleAll = () => {
    const searching = this.searching;
    this.searching = false;
    const newParams = {};
    if (!this.applyParams(newParams) && searching) {
      // Hide the search form if it was previously visible.
      this.forceUpdate();
    }
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
    const newParams = _.omit(this.params, ['page', 'search']);
    newParams.letter = letter;
    this.applyParams(newParams);
  }

  handleRandom = () => {
    const newParams = { random: true };
    this.applyParams(newParams);
  }

  handleFilterVisibility = () => {
    console.log('In Filter Visibility');
  }

  handleSearchVisibility = () => {
    this.searching = !this.searching;
    this.forceUpdate();
  }

  handleSearchChange = (term) => {
    const newParams = term ? { search: term} : {};
    this.applyParams(newParams);
  }

  handleSearchSubmit = (event) => {
    event.preventDefault();
    const term = event.target.elements.search.value;
    const newParams = term ? { search: term} : {};
    this.applyParams(newParams);
  }

  // Apply state for back and forward transistion into/outof/within this
  // component.
  applyState() {
    if (this.props.location) {
      this.params = this.props.location.state || {};
    }
    else {
      this.params = {};
    }
    this.getAlbums(false);
  }

  // Apply paramaters and update resources only if they are changed.
  applyParams(newParams) {
    if (_.isEqual(this.params, newParams) && !newParams.hasOwnProperty('random')) {
      // Nothing to do, new params have not changed, just return.
      // Note, if random is set then ignore this opt-out since it will always
      // generate a new set of albums.
      return false;
    }

    this.params = newParams;
    this.props.history.push('/albums', this.params);
    this.getAlbums();
    return true;
  }

  albumsURL() {
    const params = queryString.stringify(this.params);

    return params.length > 0 ? `${ALBUMS_ENDPOINT}?${params}` : ALBUMS_ENDPOINT;
  }

  getAlbums(scrollToTop = true) {
    axios.get(this.albumsURL())
      .then(response => {
        if (!this.loaded) {
          this.loaded = true;
          NProgress.done();
        }
        this.setState({
          albums: response.data.albums,
          pagination: response.data.pagination,
          error: null
        });
        if (scrollToTop) {
          window.scrollTo(0, 0);
        }
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
        Albums {this.loaded && <small>({albumsCount} {genre} {pluralize('Album', count)}{year})</small>}
      </PageHeader>
    );
  }

  showLettersFilter() {
    if (this.searching || this.params.hasOwnProperty('random')) { 
       return false;
    }
    else {
      return true;
    }
  }

  renderSearch() {
    return (
      <VelocityTransitionGroup
        enter={{
          animation: 'slideDown',
          duration: 250,
          complete: () => {
            this.search.focusSearchInput();
          }
        }}
        leave={{animation: 'slideUp', duration: 250}}>
        {this.searching &&
          <Search
            placeholder="Search Artists..."
            onSearchChange={this.handleSearchChange}
            onSearchSubmit={this.handleSearchSubmit}
            ref={(search) => this.search = search}
          />}
      </VelocityTransitionGroup>
    );
  }

  renderFilters() {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

    return (
      <div>
        <div className="filters">
          <ul className="pagination pagination-sm">
            <li onClick={this.handleAll}><a>All</a></li>
            {this.showLettersFilter() && letters.map(letter => <li onClick={() => this.handleLetter(letter)} key={letter} className={this.letterActivity(letter)}><a>{letter}</a></li>)}
            <li onClick={this.handleRandom}><FontAwesome name="random" /></li>
            <li onClick={this.handleFilterVisibility}><FontAwesome name="filter" /></li>
            <li onClick={this.handleSearchVisibility}><FontAwesome name="search" /></li>
          </ul>
        </div>
        {this.renderSearch()}
      </div>
    );
  }

  renderAlbums() {
    if (!this.loaded) {
      NProgress.start();
    }

    if (this.state.error) {
      return <h4>Error retrieving albums</h4>;
    }

    if (this.loaded && this.state.albums.length === 0) {
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
