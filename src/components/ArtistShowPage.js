import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';
import { Row, Col, PageHeader } from 'react-bootstrap';
import NProgress from 'nprogress';
import { toast } from 'react-toastify';
import axios from 'axios';
import { API_HOST } from '../config';
import '../styles/ArtistShowPage.css';

class ArtistShowPage extends Component {
  constructor(props) {
    super(props);

    this.artistSlug     = props.match.params.id;
    this.artistEndPoint = `${API_HOST}/${this.artistSlug}.json`;
    this.loaded          = false;

    this.state = {
      artist: {},
      albums: [],
      comments: [],
      commentsPagination: {},
      notFound: false,
      error: null
    };
  }

  componentDidMount() {
    this.getArtist(true);
  }

  progressDone() {
    if (!this.loaded) {
      this.loaded = true;
      NProgress.done();
    }
  }

  getArtist(scrollToTop = false) {
    axios.get(this.artistEndPoint)
      .then(response => {
        this.progressDone();
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
        console.log('In error');
        this.progressDone();
        if (error.response && error.response.status === 404) {
          this.setState({ notFound: true });
        }
        else {
          this.setState({ error: error });
        }
      });
  }

  renderHeader() {
    if (this.state.notFound) {
      toast.error(
        `The artist ${this.artistSlug} does not exist`,
        { className: 'ToastAlert' }
      );
      return <Redirect to="/artists" />;
    }
    if (this.state.error) {
      toast.error(
        'Connection failure, please retry again soon',
        { className: 'ToastAlert' }
      );
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

  render() {
    if (!this.loaded) {
      NProgress.start();
    }

    return (
      <Row>
        <Col md={10} mdOffset={1} className="ArtistShow">
          {this.renderHeader()}
          {this.renderArtist()}
        </Col>
      </Row>
    );
  }
}

export default ArtistShowPage;
