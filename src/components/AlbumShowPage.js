import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, PageHeader, Table } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import axios from 'axios';
import { API_HOST } from '../config';
import '../styles/AlbumShowPage.css';

class AlbumShowPage extends Component {
  constructor(props) {
    super(props);

    this.artistSlug    = props.match.params.artist_id;
    this.albumSlug     = props.match.params.album_id;
    this.albumEndPoint = `${API_HOST}/${this.artistSlug}/${this.albumSlug}.json`;

    this.state = {
      album: {},
      tracks: [],
      comments: [],
      commentsPagination: {}
    };
  }

  componentDidMount() {
    this.getAlbum();
  }

  getAlbum() {
    axios.get(this.albumEndPoint)
      .then(response => {
        this.setState({
          album: response.data.album,
          tracks: response.data.tracks,
          comments: response.data.comments,
          commentsPagination: response.data.comments_pagination
        });
      });
  }

  handleYear(year) {
    const params = { year };
    this.props.history.push('/albums', params);
  }

  handleGenre(genre) {
    const params = { genre };
    this.props.history.push('/albums', params);
  }

  renderHeader() {
    const albumTitle = this.state.album.title;
    const artistName = this.state.album.artist_name;

    return (
      <Col md={10} mdOffset={1}>
        <PageHeader>
          {albumTitle} <small>by <Link 
              to={`/artist/${this.artistSlug}`}>{artistName}</Link></small>
        </PageHeader>
      </Col>
    );
  }

  renderCover() {
    const { album } = this.state;

    return (
      <Col md={4} mdOffset={1}>
        <img 
          className="img-responsive center-block" 
          src={album.cover_url} 
          alt={album.title} />
      </Col>
    );
  }

  renderTracks(tracks) {
    return (
      tracks.map(track => {
        return (
          <tr key={track.id}>
            <td>{track.number}.</td>
            <td>{track.title}</td>
            <td>{track.duration}</td>
          </tr>
        );
      })
    );
  }

  renderAlbum() {
    const { album, tracks } = this.state;

    return (
      <Col md={6}>
        <h2>
          {album.track_count} Tracks <small>(Time {album.total_duration})</small>
        </h2>
        <span className="icon">
          <a onClick={() => this.handleYear(album.year)}>
            <FontAwesome name="calendar" /> {album.year}
          </a>
          <a onClick={() => this.handleGenre(album.genre)}>
            <FontAwesome name="tag" className="spacer-left-xs" /> {album.genre}
          </a>
        </span>
        <Table striped>
          <thead>
            <tr>
              <th>No.</th>
              <th>Title</th>
              <th>Duration</th>
            </tr>
          </thead>
          <tbody>
            {this.renderTracks(tracks)}
          </tbody>
        </Table>
      </Col>
    );
  }

  render() {
    return (
      <Row>
        <div className="AlbumShow">
          {this.renderHeader()}
          {this.renderCover()}
          {this.renderAlbum()}
        </div>
      </Row>
    );
  }
}

export default AlbumShowPage;
