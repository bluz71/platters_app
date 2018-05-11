import React, { Component } from 'react';
import axios from 'axios';
import pluralize from 'pluralize';
import numeral from 'numeral';
import NProgress from 'nprogress';
import { Row, Col, PageHeader } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import { API_HOST } from '../config';
import CommentsList from './CommentsList';
import '../styles/UserCommentsPage.css';

class UserCommentsPage extends Component {
  constructor(props) {
    super(props);

    this.user_slug         = props.match.params.id;
    this.comments_endpoint = `${API_HOST}/comments/${this.user_slug}.json`;
    this.loaded            = false;
    this.waiting           = false;
    if (props.location.state) {
      this.user = props.location.state.user || this.user_slug;
    }
    else {
      this.user = this.user_slug;
    }

    this.state = {
      comments: [],
      pagination: {}
    };

    // Bind 'this' for callback functions.
    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    window.onscroll = this.handleScroll;
    this.getComments();
  }

  componentWillUnmount() {
    window.onscroll = null;
  }

  handleScroll() {
    // See: http://blog.sodhanalibrary.com/2016/08/detect-when-user-scrolls-to-bottom-of.html

    const windowHeight = 'innerHeight' in window ? window.innerHeight : document.documentElement.offsetHeight;
    const body         = document.body;
    const html         = document.documentElement;
    const docHeight    = Math.max(body.scrollHeight, body.offsetHeight,
                                  html.clientHeight,  html.scrollHeight,
                                  html.offsetHeight) - 20;
    const windowBottom = windowHeight + window.pageYOffset;
    const moreToScroll = this.state.pagination && this.state.pagination.next_page;

    if (moreToScroll && windowBottom >= docHeight) {
      // Disable scroll handling whilst records are being retrieved.
      window.onscroll = null;
      this.comments_endpoint
        = `${API_HOST}/comments/${this.user_slug}.json?page=${this.state.pagination.next_page}`;
      this.loaded = false;
      this.forceUpdate();
      this.getComments();
    }
  }

  getComments() {
    axios.get(this.comments_endpoint)
      .then(response => {
        if (!this.loaded) {
          this.loaded = true;
          NProgress.done();
        }
        if (!this.waiting) {
          this.waiting = true;
        }
        if (!window.onscroll) {
          // Re-enable scroll handling now that the records have been
          // retrieved.
          window.onscroll = this.handleScroll;
        }
        this.setState({
          comments: [...this.state.comments, ...response.data.comments],
          pagination: response.data.pagination,
        });
      });
  }

  renderHeader() {
    const count = this.state.pagination.total_count;
    const commentsCount = numeral(count).format('0,0');

    return (
      <PageHeader>
        {`${this.user}'s Comments`} {this.loaded && <small>({commentsCount} {pluralize('Comment', count)})</small>}
      </PageHeader>
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
            <CommentsList comments={this.state.comments} />
            {this.renderSpinner()}
          </div>
        </Col>
      </Row>
    );
  }
}

export default UserCommentsPage;
