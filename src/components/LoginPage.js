import React, { Component } from 'react';
import axios from 'axios';
import { Row, Col, PageHeader, Well, Form, FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';
import { appAuth } from '../lib/appAuth';
import { API_HOST } from '../config';
import toastAlert from '../helpers/toastAlert';

const LOGIN_ENDPOINT = `${API_HOST}/api/log_in`;

class LoginPage extends Component {
  constructor(props) {
    super(props);

    // Bind 'this' for callback functions.
    this.handleUserSubmit = this.handleUserSubmit.bind(this);
  }

  handleUserSubmit(event) {
    event.preventDefault();

    const authUser = {
      auth_user: {
        email:    this.emailInput.value,
        password: this.passwordInput.value
      }
    };

    this.postUser(authUser);
  }

  postUser(authUser) {
    axios.post(LOGIN_ENDPOINT, authUser)
      .then(response => {
        appAuth.logIn(response.data.auth_token);
        this.props.history.push('/');
      })
      .catch(error => {
        if (error.response && error.response.status === 401) {
          toastAlert(`Incorrect log in credentials, ${error.response.data.error}`);
        }
        else if (error.response && error.response.status === 404) {
          toastAlert('Incorrect log in credentials, user not found');
        }
        else if (error.response && error.response.status === 403) {
          toastAlert('User account has not been confirmed');
        }
        else {
          toastAlert('Server error, please try again later');
        }
      });
  }

  renderForm() {
    return (
      <Well>
        <Form horizontal onSubmit={this.handleUserSubmit}>
          <ul className="list-group">
          </ul>

          <FormGroup>
            <Col componentClass={ControlLabel} md={2}>
              Email
            </Col>
            <Col md={9}>
              <FormControl
                type="email"
                inputRef={(input) => this.emailInput = input}
              />
            </Col>
          </FormGroup>

          <FormGroup>
            <Col componentClass={ControlLabel} md={2}>
              Password
            </Col>
            <Col md={9}>
              <FormControl
                type="password"
                inputRef={(input) => this.passwordInput = input}
              />
            </Col>
          </FormGroup>

          <FormGroup>
            <Col mdOffset={2} md={9}>
              <Button
                type="submit"
                bsStyle="success"
                bsSize="small"
                className="submit"
              >
                Sign in
              </Button>
            </Col>
          </FormGroup>
        </Form>
      </Well>
    );
  }

  render() {
    return (
      <Row className="Login">
        <Col md={10} mdOffset={1}>
          <PageHeader>Log in</PageHeader>
          {this.renderForm()}
        </Col>
      </Row>
    );
  }
}


export default LoginPage;
