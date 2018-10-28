import React, { Component } from 'react';
import axios from 'axios';
import { Row, Col, Jumbotron } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';
import { API_HOST } from '../config';
import { appAuth } from '../lib/appAuth';
import '../styles/HomePage.css';
import logo from '../images/platters-black.svg';
import toastAlert from '../helpers/toastAlert';
import pageProgress from '../helpers/pageProgress';
import AlbumsList from './AlbumsList';
import CommentsList from './CommentsList';

const HOME_ENDPOINT = `${API_HOST}/home.json`;

class HomePage extends Component {
  constructor(props) {
    super(props);
    window.scrollTo(0, 0);

    this.loaded = false;
    this.pageProgress = new pageProgress();

    // Note, use a Map for comments since it preserves insertion order whilst
    // allowing O(1) comment deletion.
    this.state = {
      albumOfTheDay: {},
      mostRecentAlbums: [],
      mostRecentComments: new Map(),
      error: null
    };

    // Bind 'this' for callback functions.
    this.handleYear = this.handleYear.bind(this);
    this.handleGenre = this.handleGenre.bind(this);
    this.handleDeleteComment = this.handleDeleteComment.bind(this);
  }

  componentDidMount() {
    this.getHome();
  }

  handleYear(year) {
    const params = { year };
    this.props.history.push('/albums', params);
  }

  handleGenre(genre) {
    const params = { genre };
    this.props.history.push('/albums', params);
  }

  handleDeleteComment(commentId) {
    // Note, we need to copy the comments hash map since we must not mutate
    // React state directly.
    const mostRecentComments = new Map([...this.state.mostRecentComments]);
    // Delete the comment of interest.
    mostRecentComments.delete(commentId);
    // Apply the updated state.
    this.setState({ mostRecentComments });
  }

  getHome() {
    axios
      .get(HOME_ENDPOINT)
      .then((response) => {
        this.loaded = this.pageProgress.done();
        this.setState({
          albumOfTheDay: response.data.album_of_the_day,
          mostRecentAlbums: response.data.most_recent.albums,
          mostRecentComments: new Map(
            response.data.most_recent.comments.map((c) => [c.id, c])
          ),
          error: null
        });
      })
      .catch((error) => {
        this.pageProgress.done();
        this.setState({ error: error });
      });
  }

  homeRetrieved() {
    if (!this.loaded || this.state.error) {
      return false;
    } else {
      return true;
    }
  }

  renderIntroduction() {
    if (appAuth.isLoggedIn()) {
      return;
    }

    return (
      <div>
        <Row className="first">
          <Col md={7}>
            <Jumbotron>
              <h1>Platters</h1>
              <p>
                An album collection web application developed using modern web
                technologies.
              </p>
              <div className="text-center">
                <Link to="/about" className="btn btn-success btn-lg">
                  About
                </Link>
                <Link
                  to="/sign_up"
                  className="btn btn-success btn-lg spacer-left-tiny"
                >
                  Sign Up
                </Link>
              </div>
            </Jumbotron>
          </Col>

          <Col md={5}>
            <div className="logo">
              <img
                src={logo}
                alt="Platters"
                className="img-responsive center-block"
              />
            </div>
          </Col>
        </Row>

        <Row className="dark">
          <h2>Prime technologies used by the Platters application.</h2>
          <Col md={4} className="text-center">
            <FontAwesome name="code" />
            <p>React JavaScript front-end user interface library</p>
          </Col>
          <Col md={4} className="text-center">
            <FontAwesome name="diamond" />
            <p>Ruby on Rails back-end API server</p>
          </Col>
          <Col md={4} className="text-center">
            <FontAwesome name="tablet" />
            <p>Bootstrap responsive front-end web framework.</p>
          </Col>
          <div className="complete-details">
            <Link to="/details" className="btn btn-success">
              Complete Details
            </Link>
          </div>
        </Row>
      </div>
    );
  }

  renderAlbumOfTheDay() {
    if (this.state.error) {
      toastAlert('Connection failure, please retry again later');
      return;
    }
    if (!this.homeRetrieved()) {
      return;
    }

    const {
      title,
      artist,
      artist_slug,
      album_slug,
      cover_url
    } = this.state.albumOfTheDay;
    return (
      <div className="album-of-the-day">
        <Row>
          <Col md={12}>
            <h2 className="page-header">
              Album of the day -{' '}
              <Link to={`/artist/${artist_slug}/album/${album_slug}`}>
                {title}
              </Link>{' '}
              <small>
                by <Link to={`/artist/${artist_slug}`}>{artist}</Link>
              </small>
            </h2>
            <Jumbotron>
              <img
                className="img-responsive center-block"
                src={cover_url}
                alt={title}
              />
            </Jumbotron>
          </Col>
        </Row>
      </div>
    );
  }

  renderMostRecentAlbums() {
    if (!this.homeRetrieved()) {
      return;
    }

    return (
      <Row>
        <Col md={12}>
          <h2 className="page-header">New Albums</h2>
          <AlbumsList
            albums={this.state.mostRecentAlbums}
            onYear={this.handleYear}
            onGenre={this.handleGenre}
          />
        </Col>
      </Row>
    );
  }

  renderMostRecentComments() {
    if (!this.homeRetrieved()) {
      return;
    }

    return (
      <Row>
        <Col md={12}>
          <h2 className="page-header">New Comments</h2>
          <CommentsList
            comments={this.state.mostRecentComments}
            onDeleteComment={this.handleDeleteComment}
          />
        </Col>
      </Row>
    );
  }

  render() {
    this.pageProgress.start();

    return (
      <div className="Home">
        {this.renderIntroduction()}
        {this.renderAlbumOfTheDay()}
        {this.renderMostRecentAlbums()}
        {this.renderMostRecentComments()}
      </div>
    );
  }
}

export default HomePage;
