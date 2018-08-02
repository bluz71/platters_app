import React, { Component } from 'react';
import axios from 'axios';
import { Row, Col, PageHeader } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';
import pluralize from 'pluralize';
import numeral from 'numeral';
import queryString from 'query-string';
import _ from 'lodash';
import { VelocityTransitionGroup } from 'velocity-react';
import { toast } from 'react-toastify';
import '../styles/ArtistsPage.css';
import { API_HOST } from '../config';
import pageProgress from '../helpers/pageProgress';
import Search from './Search';
import Paginator from './Paginator';
import ArtistsSidebar from './ArtistsSidebar';

const ARTISTS_ENDPOINT = `${API_HOST}/artists.json`;

class ArtistsPage extends Component {
  constructor(props) {
    super(props);

    // params is not React state since we do not want to re-render when it
    // changes; just use an instance variable instead.
    this.params       = {};
    this.loaded       = false;
    this.searching    = false;
    this.pageProgress = new pageProgress();

    this.state = {
      artists: [],
      mostRecentAlbums: [],
      mostRecentComments: [],
      pagination: {},
      error: null
    };

    // Bind 'this' for callback functions.
    this.handlePopState         = this.handlePopState.bind(this);
    this.handlePageChange       = this.handlePageChange.bind(this);
    this.handleAll              = this.handleAll.bind(this);
    this.handleLetter           = this.handleLetter.bind(this);
    this.handleSearchVisibility = this.handleSearchVisibility.bind(this);
    this.handleSearchChange     = this.handleSearchChange.bind(this);
    this.handleSearchSubmit     = this.handleSearchSubmit.bind(this);
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

  handlePopState(event) {
    event.preventDefault();
    this.applyState();
  }

  handlePageChange(page) {
    const newParams = { ...this.params, page };
    this.applyParams(newParams);
  }

  handleAll() {
    const searching = this.searching;
    this.searching = false;
    const newParams = {};
    if (!this.applyParams(newParams) && searching) {
      // Hide the search form if it was previously visible.
      this.forceUpdate();
    }
  }

  handleLetter(letter) {
    const newParams = _.omit(this.params, ['page']);
    newParams.letter = letter;
    this.applyParams(newParams);
  }

  handleSearchVisibility() {
    this.searching = !this.searching;
    this.forceUpdate();
  }

  handleSearchChange(search) {
    const newParams = search ? { search } : {};
    this.applyParams(newParams);
  }

  handleSearchSubmit(event) {
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
    this.getArtists(false);
  }

  // Apply paramaters and update resources only if they are changed.
  applyParams(newParams) {
    if (_.isEqual(this.params, newParams)) {
      // Nothing to do, new params have not changed, just return.
      return false;
    }

    this.params = newParams;
    this.props.history.push('/artists', this.params);
    this.getArtists();
    return true;
  }

  artistsURL() {
    const params = queryString.stringify(this.params);

    return params.length > 0 ? `${ARTISTS_ENDPOINT}?${params}` : ARTISTS_ENDPOINT;
  }

  getArtists(scrollToTop = true) {
    axios.get(this.artistsURL())
      .then(response => {
        this.loaded = this.pageProgress.done();
        this.setState({
          artists: response.data.artists,
          mostRecentAlbums: response.data.most_recent.albums,
          mostRecentComments: response.data.most_recent.comments,
          pagination: response.data.pagination,
          error: null
        });
        if (scrollToTop) {
          window.scrollTo(0, 0);
        }
      })
      .catch(error => {
        this.pageProgress.done();
        this.setState({ error: error });
      });
  }

  letterActivity(letter) {
    if (this.params.letter === letter) {
      return 'active';
    }
  }

  artistsRetrieved() {
    if (!this.loaded || this.state.error) {
      return false;
    }
    else {
      return true;
    }
  }

  renderHeader() {
    const count = this.state.pagination.total_count;
    const artistsCount = numeral(count).format('0,0');

    return (
      <PageHeader>
        Artists {this.artistsRetrieved() && <small>({artistsCount} {pluralize('Artist', count)})</small>}
      </PageHeader>
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
    if (!this.artistsRetrieved()) {
      return;
    }

    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

    return (
      <div>
        <div className="filters">
          <ul className="pagination pagination-sm">
            <li onClick={this.handleAll}><a>All</a></li>
            {!this.searching && letters.map((letter, index) => <li onClick={() => this.handleLetter(letter)} key={index} className={this.letterActivity(letter)}><a>{letter}</a></li>)}
            <li onClick={this.handleSearchVisibility}><FontAwesome name="search" /></li>
          </ul>
        </div>
        {this.renderSearch()}
      </div>
    );
  }

  renderArtists() {
    this.pageProgress.start();

    if (this.state.error) {
      toast.error('Connection failure, please retry again later', { className: 'ToastAlert' });
    }

    if (!this.state.error && this.loaded && this.state.artists.length === 0) {
      return <h4>No matching artists</h4>;
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
    if (!this.state.error && this.state.pagination.total_pages > 1) {
      return (
        <Paginator pagination={this.state.pagination} onPageChange={this.handlePageChange} />
      );
    }
  }

  render() {
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
        <ArtistsSidebar
          mostRecentAlbums={this.state.mostRecentAlbums}
          mostRecentComments={this.state.mostRecentComments}
        />
      </Row>
    );
  }
}

export default ArtistsPage;
