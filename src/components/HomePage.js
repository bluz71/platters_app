import React, { Component } from 'react';
import axios from 'axios';
import { Row, Col, Jumbotron } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';
import { API_HOST } from '../config';
import  '../styles/HomePage.css';
import logo from '../images/platters-black.svg';
import AlbumsList from './AlbumsList';
import CommentsList from './CommentsList';

const HOME_ENDPOINT = `${API_HOST}/home.json`;

class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      albumOfTheDay: {},
      mostRecentAlbums: [],
      mostRecentComments: []
    };

    // Bind 'this' for callback functions.
    this.handleYear  = this.handleYear.bind(this);
    this.handleGenre = this.handleGenre.bind(this);
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

  getHome() {
    axios.get(HOME_ENDPOINT)
      .then(response => {
        this.setState({
          albumOfTheDay: response.data.album_of_the_day,
          mostRecentAlbums: response.data.most_recent.albums,
          mostRecentComments: response.data.most_recent.comments
        });
      });
  }

  renderIntroduction() {
    return (
      <div>
        <Row className="first">
          <Col md={7}>
            <Jumbotron>
              <h1>Platters</h1>
              <p>An album collection web application developed using modern web technologies.</p>
              <div className="text-center">
                <Link to="/about" className="btn btn-success btn-lg">
                  About
                </Link>
                <Link to="/sign_up" className="btn btn-success btn-lg spacer-left-tiny">
                  Sign Up
                </Link>
              </div>
            </Jumbotron>
          </Col>

          <Col md={5}>
            <div className="logo">
              <img src={logo} alt="Platters" className="img-responsive center-block" />
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
          <div className="complete-details text-center">
            <Link to="/details" className="btn btn-success">
              Complete Details
            </Link>
          </div>
        </Row>
      </div>
    );
  }

  renderAlbumOfTheDay() {
    const { title, artist, artist_slug, album_slug, cover_url } = this.state.albumOfTheDay;
    return (
      <div className="album-of-the-day">
        <Row>
          <Col md={12}>
            <h2 className="page-header">
              Album of the day - <Link to={`/artist/${artist_slug}/album/${album_slug}`}>{title}</Link> <small>by <Link to={`/artist/${artist_slug}`}>{artist}</Link></small>
            </h2>
            <Jumbotron>
              <img className="img-responsive center-block" src={cover_url} alt={title} />
            </Jumbotron>
          </Col>
        </Row>
      </div>
    );
  }

  renderMostRecentAlbums() {
    return (
      <div>
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
      </div>
    );
  }

  renderMostRecentComments() {
    return (
      <div>
        <Row>
          <Col md={12}>
            <h2 className="page-header">New Comments</h2>
            <CommentsList comments={this.state.mostRecentComments} />
          </Col>
        </Row>
      </div>
    );
  }

  render() {
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
