import React, { Component } from 'react';
import { API_HOST } from '../config';

class UserCommentsPage extends Component {
  constructor(props) {
    super(props);

    this.user_slug = props.match.params.id;
    this.user = props.location.state.user;
    this.comments_endpoint = `${API_HOST}/comments/${props.match.params.id}.json`;
  }

  render() {
    return (
      <h1>User Comments for {this.user}</h1>
    );
  }
}

export default UserCommentsPage;
