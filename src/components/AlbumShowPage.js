import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, PageHeader, Table, Button } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import NProgress from 'nprogress';
import axios from 'axios';
import { API_HOST } from '../config';
import '../styles/AlbumShowPage.css';

class AlbumShowPage extends Component {
  constructor(props) {
    super(props);

    this.artistSlug       = props.match.params.artist_id;
    this.albumSlug        = props.match.params.album_id;
    this.albumEndPoint    = `${API_HOST}/${this.artistSlug}/${this.albumSlug}.json`;
    this.showingAllTracks = false;
    this.loaded           = false;

    this.state = {
      album: {},
      tracks: [],
      comments: [],
      commentsPagination: {}
    };

    this.handleTrackVisibility = this.handleTrackVisibility.bind(this);
  }

  componentDidMount() {
    this.getAlbum();
  }

  progressDone() {
    if (!this.loaded) {
      this.loaded = true;
      NProgress.done();
    }
  }

  getAlbum() {
    axios.get(this.albumEndPoint)
      .then(response => {
        this.progressDone();
        document.title = response.data.album.title;
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

  handleTrackVisibility() {
    this.showingAllTracks = !this.showingAllTracks;
    this.tracksBtn.scrollIntoView();
    this.forceUpdate();
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

  trackVisibilityVal(track) {
    if (track.number <= 20 || this.showingAllTracks) {
      return 'visible';
    }
    else {
      return 'invisible';
    }
  }

  renderTracks(tracks) {
    return (
      tracks.map(track => {
        return (
          <tr key={track.id} className={this.trackVisibilityVal(track)}>
            <td>{track.number}.</td>
            <td>{track.title}</td>
            <td>{track.duration}</td>
          </tr>
        );
      })
    );
  }

  renderTracksVisibility() {
    const { tracks } = this.state;

    if (tracks.length <= 20) {
      return;
    }

    const btnText  = this.showingAllTracks ? 'Show less tracks' : 'Show more tracks';

    return (
      <div>
        {!this.showingAllTracks && <div className="tracks-gradient" />}
        <div ref={tracksBtn => this.tracksBtn = tracksBtn}>
          <Button
            bsSize="small"
            className={this.showingAllTracks ? 'tracks-less' : 'tracks-more'}
            onClick={this.handleTrackVisibility}
          >
            {btnText}
          </Button>
        </div>
      </div>
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
        {this.renderTracksVisibility()}
      </Col>
    );
  }

  render() {
    if (!this.loaded) {
      NProgress.start();
    }

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
