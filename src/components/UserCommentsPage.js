import React, { Component } from 'react';
import axios from 'axios';
import pluralize from 'pluralize';
import numeral from 'numeral';
import NProgress from 'nprogress';
import { Row, Col, PageHeader } from 'react-bootstrap';
import { API_HOST } from '../config';
import CommentsList from './CommentsList';
import '../styles/UserCommentsPage.css';

class UserCommentsPage extends Component {
  constructor(props) {
    super(props);

    this.user_slug         = props.match.params.id;
    this.user              = props.location.state.user;
    this.comments_endpoint = `${API_HOST}/comments/${props.match.params.id}.json`;
    this.loaded            = false;

    this.state = {
      comments: [],
      pagination: {}
    };
  }

  componentDidMount() {
    this.getComments();
  }

  getComments() {
    axios.get(this.comments_endpoint)
      .then(response => {
        if (!this.loaded) {
          this.loaded = true;
          NProgress.done();
        }
        this.setState({
          comments: response.data.comments,
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
          </div>
        </Col>
      </Row>
    );
  }
}

export default UserCommentsPage;
