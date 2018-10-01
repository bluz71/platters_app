import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import pluralize from 'pluralize';
import numeral from 'numeral';
import { Row, Col, PageHeader } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import { API_HOST } from '../config';
import pageProgress from '../helpers/pageProgress';
import infiniteScroll from '../helpers/infiniteScroll';
import toastAlert from '../helpers/toastAlert';
import CommentsList from './CommentsList';
import '../styles/UserCommentsPage.css';

class UserCommentsPage extends Component {
  constructor(props) {
    super(props);

    this.userSlug         = props.match.params.id;
    this.commentsEndPoint = `${API_HOST}/comments/${this.userSlug}.json`;
    this.loaded           = false;
    this.waiting          = false;
    this.pageProgress     = new pageProgress();

    this.state = {
      comments: new Map(),
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
    this.getComments(this.commentsEndPoint);
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
    const commentsPageEndPoint
      = `${this.commentsEndPoint}?page=${this.state.pagination.next_page}`;
    this.waiting = true;
    this.forceUpdate(); // Render spinner
    this.getComments(commentsPageEndPoint);
  }

  getComments(commentsEndPoint) {
    axios.get(commentsEndPoint)
      .then(response => {
        this.loaded = this.pageProgress.done();
        this.waiting = false;
        if (!window.onscroll) {
          // Re-enable scroll handling now that the records have been
          // retrieved.
          window.onscroll = this.handleScroll;
        }
        // console.log(`UserCommentsPage data: ${JSON.stringify(response, null, 2)}`)
        this.setState({
          comments: new Map([
            ...this.state.comments,
            ...response.data.comments.map(c => [c.id, c])
          ]),
          pagination: response.data.pagination,
        });
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

  commentsRetrieved() {
    if (!this.loaded || this.state.notFound || this.state.error) {
      return false;
    }
    else {
      return true;
    }
  }

  renderHeader() {
    if (this.state.notFound) {
      toastAlert(`User ${this.userSlug} does not exist`);
      return <Redirect to="/" />;
    }
    if (this.state.error) {
      toastAlert('Connection failure, please retry again soon');
      return <Redirect to="/" />;
    }

    const count = this.state.pagination.total_count;
    const commentsCount = numeral(count).format('0,0');

    return (
      <PageHeader>
        Comments {this.commentsRetrieved()
            && <small>({commentsCount} {pluralize('Comment', count)})</small>}
      </PageHeader>
    );
  }

  renderComments() {
    return (
      <CommentsList comments={this.state.comments} />
    );
  }

  renderSpinner() {
    if (this.waiting) {
      return (
        <div className="WaitingSpinner">
          <FontAwesome name="spinner" spin pulse />
        </div>
      );
    }
  }

  render() {
    this.pageProgress.start();

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
