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
    this.mounted = false;

    this.state = {
      artists: [],
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
    const newParams = {};
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
      return;
    }

    this.params = newParams;
    this.props.history.push('/artists', this.params);
    this.getArtists();
  }

  artistsURL() {
    const params = queryString.stringify(this.params);

    return params.length > 0 ? `${ARTISTS_ENDPOINT}?${params}` : ARTISTS_ENDPOINT;
  }

  getArtists(scrollToTop = true) {
    axios.get(this.artistsURL())
      .then(response => {
        if (!this.mounted) {
          this.mounted = true;
        }
        this.setState({
          artists: response.data.artists,
          pagination: response.data.pagination,
          error: null
        });
        if (scrollToTop) {
          window.scrollTo(0,0);
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
    const artistsCount = numeral(count).format('0,0');

    return (
      <PageHeader>
        Artists {this.mounted && <small>({artistsCount} {pluralize('Artist', count)})</small>}
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
    if (this.state.error) {
      return <h4>Error retrieving artists</h4>;
    }

    if (this.mounted && this.state.artists.length === 0) {
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
      </Row>
    );
  }
}

export default Artists;
