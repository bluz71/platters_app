import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';
import { Row, Col, PageHeader } from 'react-bootstrap';
import axios from 'axios';
import pluralize from 'pluralize';
import { API_HOST } from '../config';
import pageProgress from '../helpers/pageProgress';
import toastAlert from '../helpers/toastAlert';
import ArtistAlbumsList from './ArtistAlbumsList';
import '../styles/ArtistShowPage.css';

const ARTIST_ALBUMS_SORT_BY = {
  newest: 'newest',
  oldest: 'oldest',
  longest: 'longest',
  name: 'name'
};

class ArtistShowPage extends Component {
  constructor(props) {
    super(props);

    this.artistSlug     = props.match.params.id;
    this.artistEndPoint = `${API_HOST}/${this.artistSlug}.json`;
    this.loaded         = false;
    this.pageProgress   = new pageProgress();
    this.albumsSortBy   = ARTIST_ALBUMS_SORT_BY.newest;
    this.albumsEndPoint = `${API_HOST}/artists/${this.artistSlug}/albums.json`;

    this.state = {
      artist: {},
      albums: [],
      comments: [],
      commentsPagination: {},
      notFound: false,
      error: null
    };

    // Bind 'this' for callback functions.
    this.handleYear        = this.handleYear.bind(this);
    this.handleGenre       = this.handleGenre.bind(this);
    this.handleAlbumsOrder = this.handleAlbumsOrder.bind(this);
  }

  componentDidMount() {
    this.getArtist(true);
  }

  handleYear(year) {
    const params = { year };
    this.props.history.push('/albums', params);
  }

  handleGenre(genre) {
    const params = { genre };
    this.props.history.push('/albums', params);
  }

  handleAlbumsOrder(order) {
    const albumsEndPoint
      = `${this.albumsEndPoint}?${order}=true`;
    this.albumsSortBy = order;
    this.getAlbums(albumsEndPoint);
  }

  getArtist(scrollToTop = false) {
    axios.get(this.artistEndPoint)
      .then(response => {
        this.loaded = this.pageProgress.done();
        document.title = response.data.artist.name;
        this.setState({
          artist: response.data.artist,
          albums: response.data.albums,
          comments: response.data.comments,
          commentsPagination: response.data.comments_pagination
        });
        if (scrollToTop) {
          window.scrollTo(0, 0);
        }
      }).catch(error => {
        this.pageProgress.done();
        if (error.response && error.response.status === 404) {
          this.setState({ notFound: true });
        }
        else {
          this.setState({ error: error });
        }
      });
  }

  getAlbums(albumsEndPoint) {
    axios.get(albumsEndPoint)
      .then(response => {
        this.setState({ albums: response.data.albums });
      }).catch(error => {
        this.setState({ error: error });
      });
  }

  artistRetrieved() {
    if (!this.loaded || this.state.notFound || this.state.error) {
      return false;
    }
    else {
      return true;
    }
  }

  renderHeader() {
    if (this.state.notFound) {
      toastAlert(`The artist ${this.artistSlug} does not exist`);
      return <Redirect to="/artists" />;
    }
    if (this.state.error) {
      toastAlert('Connection failure, please retry again soon');
      return <Redirect to="/" />;
    }

    return (
      <PageHeader>
        {this.state.artist.name}
      </PageHeader>
    );
  }

  renderWikipedia(wikipedia) {
    if (!wikipedia) {
      return;
    }

    const wikipediaURL = `https://www.wikipedia.org/wiki/${wikipedia}`;

    return (
      <a href={wikipediaURL} target="_blank" rel="noopener noreferrer">Wikipedia</a>
    );
  }

  renderWebsite(website, websiteLink) {
    if (!website) {
      return <div className="spacer-bottom-sm"></div>;
    }

    return (
      <div className="website">
        <span className="icon spacer-right-xxs"><FontAwesome name="globe" /></span>
        <a href={website} target="_blank" rel="noopener noreferrer">
          {websiteLink}
        </a>
      </div>
    );
  }

  renderArtist() {
    const { description, wikipedia, website } = this.state.artist;
    const websiteLink = this.state.artist.website_link;

    return (
      <div className="description">
        <p>{description} </p>
        {this.renderWikipedia(wikipedia)}
        {this.renderWebsite(website, websiteLink)}
      </div>
    );
  }

  albumsSortByActivity(sortBy) {
    if (this.albumsSortBy === sortBy) {
      return 'active';
    }
  }

  renderAlbumsList(albumsCount) {
    if (albumsCount === 0) {
      return;
    }

    const artistSlug = this.state.artist.slug;

    return (
      <div>
        <ul className="albums-order">
          <li
            className={this.albumsSortByActivity(ARTIST_ALBUMS_SORT_BY.newest)}
            onClick={() => this.handleAlbumsOrder(ARTIST_ALBUMS_SORT_BY.newest)}
          >
            Newest
          </li>
          <li
            className={this.albumsSortByActivity(ARTIST_ALBUMS_SORT_BY.oldest)}
            onClick={() => this.handleAlbumsOrder(ARTIST_ALBUMS_SORT_BY.oldest)}
          >
            Oldest
          </li>
          <li
            className={this.albumsSortByActivity(ARTIST_ALBUMS_SORT_BY.longest)}
            onClick={() => this.handleAlbumsOrder(ARTIST_ALBUMS_SORT_BY.longest)}
          >
            Longest
          </li>
          <li
            className={this.albumsSortByActivity(ARTIST_ALBUMS_SORT_BY.name)}
            onClick={() => this.handleAlbumsOrder(ARTIST_ALBUMS_SORT_BY.name)}
          >
            Name
          </li>
        </ul>
        <ArtistAlbumsList 
          albums={this.state.albums}
          artistSlug={artistSlug}
          onYear={this.handleYear}
          onGenre={this.handleGenre}
        />
      </div>
    );
  }

  renderAlbums() {
    const albumsCount = this.state.albums.length;

    return (
      <div className="albums">
        <PageHeader>
          Albums {this.artistRetrieved()
              && <small>({albumsCount} {pluralize('Album', albumsCount)})</small>}
        </PageHeader>
        {this.renderAlbumsList()}
      </div>
    );
  }

  render() {
    this.pageProgress.start();

    return (
      <Row>
        <Col md={10} mdOffset={1} className="ArtistShow">
          {this.renderHeader()}
          {this.renderArtist()}
          {this.renderAlbums()}
        </Col>
      </Row>
    );
  }
}

export default ArtistShowPage;
