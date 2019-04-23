import React, { Component } from 'react';
import axios from 'axios';
import {
  Row,
  Col,
  PageHeader,
  Well,
  Form,
  FormGroup,
  ControlLabel,
  FormControl,
  HelpBlock,
  Button
} from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import { API_HOST, APPLICATION_HOST } from '../config';
import { toastAlert, toastNotice } from '../helpers/toastMessage';
import '../styles/SignupPage.css';

const USER_NEW_ENDPOINT = `${API_HOST}/api/users`;

class SignupPage extends Component {
  constructor(props) {
    super(props);

    document.title = 'Platters App';

    this.state = {
      submitButtonText: 'Submit',
      errors: []
    };

    // Bind 'this' for callback functions.
    this.handleAccountSubmit = this.handleAccountSubmit.bind(this);
    this.handleNameBlur = this.handleNameBlur.bind(this);
    this.handleNameFocus = this.handleNameFocus.bind(this);
  }

  handleAccountSubmit(event) {
    event.preventDefault();

    this.setState({
      submitButtonText: (
        <div>
          <FontAwesome name="spinner" spin pulse /> Submitting...
        </div>
      )
    });

    const newUser = {
      user: {
        email: this.emailInput.value,
        password: this.passwordInput.value,
        name: this.nameInput.value,
        application_host: APPLICATION_HOST
      }
    };

    if (this.usernameInput.value.length > 0) {
      newUser.user.username = this.usernameInput.value;
    }

    this.postUser(newUser);
  }

  handleNameBlur() {
    this.forceUpdate();
  }

  handleNameFocus() {
    this.forceUpdate();
  }

  postUser(newUser) {
    axios
      .post(USER_NEW_ENDPOINT, newUser)
      .then((response) => {
        this.setState({ submitButtonText: 'Submit' });
        toastNotice(
          `Hello ${
            newUser.user.name
          }, in order to complete your sign up, please follow the instructions in the email that was just sent to you. Please check your junk folder if you can not find the email.`
        );
        this.props.history.push('/');
      })
      .catch((error) => {
        this.setState({ submitButtonText: 'Submit' });
        if (error.response && error.response.status === 406) {
          toastAlert('Account could not be created');
          this.setState({
            errors: error.response.data.errors
          });
        } else if (error.response && error.response.status === 403) {
          toastAlert('Bot detected');
          this.props.history.push('/');
        } else {
          toastAlert('Server error, please try again later');
        }
      });
  }

  renderNameErrors() {
    return this.state.errors.map((error, index) => (
      <li key={index} className="list-group-item list-group-item-danger">
        {error}
      </li>
    ));
  }

  hasNameErrors() {
    if (!this.nameInput) {
      return;
    }

    const name = this.nameInput.value;
    if (
      (name.length < 4 || name.length > 20) &&
      this.nameInput !== document.activeElement
    ) {
      return 'has-error';
    }
  }

  renderForm() {
    return (
      <Well>
        <Form horizontal onSubmit={this.handleAccountSubmit}>
          <ul className="list-group">{this.renderNameErrors()}</ul>

          <FormGroup>
            <Col componentClass={ControlLabel} md={2}>
              Email
            </Col>
            <Col md={9}>
              <FormControl
                type="email"
                className="email"
                inputRef={(input) => (this.emailInput = input)}
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
                className="password"
                inputRef={(input) => (this.passwordInput = input)}
              />
            </Col>
          </FormGroup>

          <FormGroup className={this.hasNameErrors()}>
            <Col componentClass={ControlLabel} md={2}>
              Account name
            </Col>
            <Col md={9}>
              <FormControl
                type="text"
                className="name"
                inputRef={(input) => (this.nameInput = input)}
                onBlur={this.handleNameBlur}
                onFocus={this.handleNameFocus}
              />
              <HelpBlock>
                An account name needs to be between 4 to 20 characters made up
                only of letters, digits and hyphens.
              </HelpBlock>
            </Col>
          </FormGroup>

          <FormGroup className="username">
            <Col componentClass={ControlLabel} md={2}>
              Username
            </Col>
            <Col md={9}>
              <FormControl
                type="text"
                className="username"
                inputRef={(input) => (this.usernameInput = input)}
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
                {this.state.submitButtonText}
              </Button>
            </Col>
          </FormGroup>
        </Form>
      </Well>
    );
  }

  render() {
    return (
      <Row className="Signup">
        <Col md={10} mdOffset={1}>
          <PageHeader>Sign up</PageHeader>
          {this.renderForm()}
        </Col>
      </Row>
    );
  }
}

export default SignupPage;
