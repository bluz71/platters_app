import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Row, Col, PageHeader, Table, Button } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import NProgress from 'nprogress';
import { toast } from 'react-toastify';
import axios from 'axios';
import numeral from 'numeral';
import pluralize from 'pluralize';
import { API_HOST } from '../config';
import infiniteScroll from '../helpers/infiniteScroll';
import CommentsList from './CommentsList';
import '../styles/AlbumShowPage.css';

class AlbumShowPage extends Component {
  constructor(props) {
    super(props);

    this.artistSlug       = props.match.params.artist_id;
    this.albumSlug        = props.match.params.album_id;
    this.albumEndPoint    = `${API_HOST}/${this.artistSlug}/${this.albumSlug}.json`;
    this.showingAllTracks = false;
    this.loaded           = false;
    this.commentsEndPoint = `${API_HOST}/${this.artistSlug}/${this.albumSlug}/comments.json`;
    this.waiting          = false; // For comments when infinite-scrolling.

    this.state = {
      album: {},
      tracks: [],
      comments: [],
      commentsPagination: {},
      notFound: false,
      error: null
    };

    // Bind 'this' for callback functions.
    this.handleTrackVisibility = this.handleTrackVisibility.bind(this);
    this.handleScroll  = this.handleScroll.bind(this);
    this.handlePageEnd = this.handlePageEnd.bind(this);
  }

  componentDidMount() {
    window.onscroll = this.handleScroll;
    this.getAlbum();
  }

  componentWillUnmount() {
    window.onscroll = null;
  }

  handleScroll() {
    infiniteScroll(this.state.commentsPagination, this.handlePageEnd);
  }

  handlePageEnd() {
    // Page has been scrolled to the end, hence retrieve the next set of
    // comments.

    // Disable scroll handling whilst records are being retrieved.
    window.onscroll = null;
    this.commentsEndPoint
      = `${API_HOST}/${this.artistSlug}/${this.albumSlug}/comments.json?page=${this.state.commentsPagination.next_page}`;
    this.waiting = true;
    this.forceUpdate(); // Render spinner
    this.getComments();
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
      }).catch(error => {
        this.progressDone();
        if (error.response && error.response.status === 404) {
          this.setState({ notFound: true });
        }
        else {
          this.setState({ error: error });
        }
      });
  }

  getComments() {
    axios.get(this.commentsEndPoint)
      .then(response => {
        this.waiting = false;
        if (!window.onscroll) {
          // Re-enable scroll handling now that the records have been
          // retrieved.
          window.onscroll = this.handleScroll;
        }
        this.setState({
          comments: [...this.state.comments, ...response.data.comments],
          commentsPagination: response.data.pagination,
        });
      }).catch(error => {
        this.setState({ error: error });
      });
  }

  albumRetrieved() {
    if (!this.loaded || this.state.notFound || this.state.error) {
      return false;
    }
    else {
      return true;
    }
  }

  renderHeader() {
    if (this.state.notFound) {
      toast.error(
        `The album ${this.albumSlug} does not exist`,
        { className: 'ToastAlert' }
      );
      return <Redirect to="/albums" />;
    }
    if (this.state.error) {
      toast.error(
        'Connection failure, please retry again soon',
        { className: 'ToastAlert' }
      );
      return <Redirect to="/" />;
    }

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
      <Col md={4} mdOffset={1} className="large-cover">
        <img 
          className="img-responsive center-block" 
          src={album.cover_url} 
          alt={album.title}
        />
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

    const btnText  = this.showingAllTracks ? 'Show less tracks' : 'Show all tracks';

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
      <Col md={6} className="album-data">
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

  renderCommentsList(count) {
    if (count === 0) {
      return (
        <h4>No comments have been posted for this album</h4>
      );
    }

    return (
      <CommentsList comments={this.state.comments} shortHeader />
    );
  }

  renderComments() {
    const count = this.state.commentsPagination.total_count;
    const commentsCount = numeral(count).format('0,0');

    return (
      <Col md={10} mdOffset={1} className="album-comments">
        <PageHeader>
          Comments {this.albumRetrieved() && <small>({commentsCount} {pluralize('Comment', count)})</small>}
        </PageHeader>
        {this.renderCommentsList(count)}
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
          {this.renderComments()}
        </div>
      </Row>
    );
  }
}

export default AlbumShowPage;
