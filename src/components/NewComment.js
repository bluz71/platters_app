import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Form, FormGroup, FormControl, Button } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import toastAlert from '../helpers/toastAlert';
import { API_HOST } from '../config';
import { appAuth } from '../lib/appAuth';
import '../styles/NewComment.css';

class NewComment extends Component {
  constructor(props) {
    super(props);

    this.newCommentEndPoint = `${API_HOST}/${
      this.props.resourcePath
    }/comments.json`;

    this.state = {
      charactersRemaining: 280,
      postItState: false
    };

    // Bind 'this' for callback functions.
    this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
    this.handleCommentChange = this.handleCommentChange.bind(this);
  }

  handleCommentSubmit(event) {
    event.preventDefault();

    const newComment = {
      comment: {
        body: this.commentText.value
      }
    };

    this.commentText.value = '';

    this.postComment(newComment);
  }

  handleCommentChange() {
    const charactersRemaining = 280 - this.commentText.value.length;
    this.setState({
      charactersRemaining,
      postItState:
        charactersRemaining >= 0 && charactersRemaining <= 280 ? true : false
    });
  }

  postComment(newComment) {
    axios
      .post(this.newCommentEndPoint, newComment, appAuth.headers())
      .then((response) => {
        this.props.onNewComment(response.data.comment);
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          toastAlert('Please log in to comment');
        } else if (error.response && error.response.status === 403) {
          toastAlert(error.response.data.error);
        } else {
          toastAlert('Server error, please try again later');
        }
      });
  }

  renderCharactersRemaining() {
    let charactersRemaining = this.state.charactersRemaining;
    let styles = 'comment-length';
    let fontAwesomeIcon = 'plus-square-o';

    if (charactersRemaining < 0) {
      charactersRemaining *= -1;
      styles += ' comment-error';
      fontAwesomeIcon = 'minus-square-o';
    }

    return (
      <span className={styles}>
        <FontAwesome name={fontAwesomeIcon} /> {charactersRemaining}{' '}
      </span>
    );
  }

  render() {
    return (
      <Form className="NewComment" onSubmit={this.handleCommentSubmit}>
        <FormGroup>
          <FormControl
            componentClass="textarea"
            rows={3}
            placeholder="Write a comment..."
            inputRef={(text) => (this.commentText = text)}
            onChange={this.handleCommentChange}
          />
        </FormGroup>
        <FormGroup>
          <div className="pull-right">
            {this.renderCharactersRemaining()}
            <Button
              type="submit"
              bsStyle="success"
              bsSize="small"
              className="submit"
              disabled={!this.state.postItState}
            >
              Post it
            </Button>
          </div>
          <div className="clearfix" />
        </FormGroup>
      </Form>
    );
  }
}

NewComment.propTypes = {
  onNewComment: PropTypes.func,
  resourcePath: PropTypes.string
};

export default NewComment;
