import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import pluralize from 'pluralize';
import numeral from 'numeral';
import NProgress from 'nprogress';
import { toast } from 'react-toastify';
import { Row, Col, PageHeader } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import { API_HOST } from '../config';
import infiniteScroll from '../helpers/infiniteScroll';
import CommentsList from './CommentsList';
import '../styles/UserCommentsPage.css';

class UserCommentsPage extends Component {
  constructor(props) {
    super(props);

    this.userSlug         = props.match.params.id;
    this.commentsEndPoint = `${API_HOST}/comments/${this.userSlug}.json`;
    this.loaded           = false;
    this.waiting          = false;

    this.state = {
      comments: [],
      pagination: {},
      notFound: false,
      error: null
    };

    // Bind 'this' for callback functions.
    this.handleScroll  = this.handleScroll.bind(this);
    this.handlePageEnd = this.handlePageEnd.bind(this);
  }

  componentDidMount() {
    window.onscroll = this.handleScroll;
    this.getComments();
  }

  componentWillUnmount() {
    window.onscroll = null;
  }

  handleScroll() {
    infiniteScroll(this.state.pagination, this.handlePageEnd);
  }

  handlePageEnd() {
    // Page has been scrolled to the end, hence retrieve the next set of
    // comments.

    // Disable scroll handling whilst records are being retrieved.
    window.onscroll = null;
    this.commentsEndPoint
      = `${API_HOST}/comments/${this.userSlug}.json?page=${this.state.pagination.next_page}`;
    this.waiting = true;
    this.forceUpdate();
    this.getComments();
  }

  progressDone() {
    if (!this.loaded) {
      this.loaded = true;
      NProgress.done();
    }
  }

  getComments() {
    axios.get(this.commentsEndPoint)
      .then(response => {
        this.progressDone();
        this.waiting = false;
        if (!window.onscroll) {
          // Re-enable scroll handling now that the records have been
          // retrieved.
          window.onscroll = this.handleScroll;
        }
        // console.log(`UserCommentsPage data: ${JSON.stringify(response, null, 2)}`)
        this.setState({
          comments: [...this.state.comments, ...response.data.comments],
          pagination: response.data.pagination,
          error: null
        });
      }).catch(error => {
        this.progressDone();
        if (error.response.status === 404) {
          this.setState({ notFound: true });
        }
        else {
          this.setState({ error: error });
        }
      });
  }

  renderHeader() {
    if (this.state.error) {
      return null;
    }

    const count = this.state.pagination.total_count;
    const commentsCount = numeral(count).format('0,0');

    return (
      <PageHeader>
        Comments {this.loaded && <small>({commentsCount} {pluralize('Comment', count)})</small>}
      </PageHeader>
    );
  }

  renderComments() {
    if (this.state.notFound) {
      toast.error(`User ${this.userSlug} does not exist`, { className: 'ToastAlert' });
      return <Redirect to="/" />;
    }
    if (this.state.error) {
      toast.error(`Error retrieving comments`, { className: 'ToastAlert' });
      return null;
    }

    return (
      <CommentsList comments={this.state.comments} />
    );
  }

  renderSpinner() {
    if (this.waiting) {
      return (
        <div className="LoadingSpinner">
          <FontAwesome name="spinner" spin pulse />
        </div>
      );
    }
  }

  render() {
    if (!this.loaded) {
      NProgress.start();
    }

    return (
      <Row>
        <Col md={10} mdOffset={1}>
          <div className="UserComments">
            {this.renderHeader()}
            {this.renderComments()}
            {this.renderSpinner()}
          </div>
        </Col>
      </Row>
    );
  }
}

export default UserCommentsPage;
