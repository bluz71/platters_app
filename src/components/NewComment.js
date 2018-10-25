import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, FormGroup, FormControl, Button } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import '../styles/NewComment.css';

class NewComment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      charactersRemaining: 280
    };

    // Bind 'this' for callback functions.
    this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
    this.handleCommentChange = this.handleCommentChange.bind(this);
  }

  handleCommentSubmit(event) {
    event.preventDefault();
  }

  handleCommentChange() {
    const charactersRemaining = 280 - this.commentText.value.length;
    this.setState({ charactersRemaining });
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

export default NewComment;
