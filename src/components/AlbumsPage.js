import React, { Component } from 'react';
import axios from 'axios';
import { Col, PageHeader } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import pluralize from 'pluralize';
import numeral from 'numeral';
import queryString from 'query-string';
import _ from 'lodash';
import { VelocityTransitionGroup } from 'velocity-react';
import NProgress from 'nprogress';
import '../styles/AlbumsPage.css';
import { API_HOST } from '../config';
import AlbumsFilter from './AlbumsFilter';
import Search from './Search';
import AlbumsList from './AlbumsList';
import Paginator from './Paginator';

const ALBUMS_ENDPOINT = `${API_HOST}/albums.json`;

class AlbumsPage extends Component {
  constructor(props) {
    super(props);

    // params is not React state since we do not want to re-render when it
    // changes; just use an instance variable instead.
    this.params = {};
    this.loaded = false;
    this.filtering = false;
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
    const formVisible = this.searching || this.filtering;
    this.searching = this.filtering = false;
    const newParams = {};
    if (!this.applyParams(newParams) && formVisible) {
      // Hide all forms if they were previously visible.
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
    this.searching = this.filtering = false;
    const newParams = { random: true };
    this.applyParams(newParams);
  }

  handleFilterVisibility = () => {
    this.filtering = !this.filtering;
    this.searching = false;
    this.forceUpdate();
  }

  handleFilterSubmit = (event) => {
    event.preventDefault();
    const newParams = {};

    const genre = this.albumsFilter.genreValue();
    if (genre !== 'Choose') {
      newParams.genre = genre;
    }

    const year = this.albumsFilter.yearValue();
    if (year.length > 0 ) {
      newParams.year = year;
    }

    const sort = this.albumsFilter.sortValue();
    if (sort !== 'title') {
      newParams.sort = sort;
    }

    const order = this.albumsFilter.orderValue();
    if (order !== 'forward') {
      newParams.order = order;
    }

    this.applyParams(newParams);
  }

  handleSearchVisibility = () => {
    this.searching = !this.searching;
    this.filtering = false;
    this.forceUpdate();
  }

  handleSearchChange = (search) => {
    const newParams = search ? { search } : {};
    this.applyParams(newParams);
  }

  handleSearchSubmit = (event) => {
    event.preventDefault();
    const search = this.search.value();
    const newParams = search ? { search } : {};
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
    this.filtering && this.albumsFilter && this.albumsFilter.selecting();
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
        this.filtering && this.albumsFilter && this.albumsFilter.selected();
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
    if (this.filtering || this.searching || this.params.hasOwnProperty('random')) {
      return false;
    }
    else {
      return true;
    }
  }

  renderAlbumsFilter() {
    return (
      <VelocityTransitionGroup
        enter={{
          animation: 'slideDown',
          duration: 250
        }}
        leave={{animation: 'slideUp', duration: 250}}>
        {this.filtering &&
          <AlbumsFilter
            onFilterSubmit={this.handleFilterSubmit}
            ref={(albumsFilter) => this.albumsFilter = albumsFilter}
          />}
      </VelocityTransitionGroup>
    );
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
        {this.renderAlbumsFilter()}
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
      <AlbumsList
        albums={this.state.albums}
        onYear={this.handleYear}
        onGenre={this.handleGenre}
      />
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

export default AlbumsPage;
