import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
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
import md5 from 'md5';
import { appAuth } from '../lib/appAuth';
import { toastAlert } from '../helpers/toastMessage';
import '../styles/UserAccountPage.css';

class UserAccountPage extends Component {
  constructor(props) {
    super(props);

    this.userSlug = props.match.params.id;
    this.user = appAuth.currentUser();
    document.title = `Platters App - ${this.userSlug}`;

    this.state = {
      updateButtonText: 'Update'
    };

    // Bind 'this' for callback functions.
    this.handleAccountUpdate = this.handleAccountUpdate.bind(this);
    this.handleDeleteAccount = this.handleDeleteAccount.bind(this);
  }

  handleAccountUpdate(event) {
    event.preventDefault();

    this.setState({
      updateButtonText: (
        <div>
          <FontAwesome name="spinner" spin pulse /> Updating...
        </div>
      )
    });

    window.confirm('Are you sure you want to delete your account?');
  }

  handleDeleteAccount() {
    window.confirm('Are you sure you want to delete your account?');
  }

  gravatarURL() {
    const hash = md5(this.user.email.trim().toLowerCase());

    return `https://gravatar.com/avatar/${hash}?s=160&r=pg&d=identicon`;
  }

  renderAccount() {
    return (
      <div>
        <PageHeader>
          Account <small>{this.user.email}</small>
        </PageHeader>
        <Well>
          <Form horizontal onSubmit={this.handleAccountUpdate}>
            <ul className="list-group" />

            <FormGroup>
              <Col componentClass={ControlLabel} md={2}>
                Name
              </Col>
              <Col md={9}>
                <FormControl
                  type="text"
                  defaultValue={this.user.name}
                  className="name"
                  inputRef={(input) => (this.nameInput = input)}
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
                <HelpBlock>
                  You must enter a password even if you are only changing your
                  account name
                </HelpBlock>
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
                  {this.state.updateButtonText}
                </Button>
              </Col>
            </FormGroup>
          </Form>
        </Well>
      </div>
    );
  }

  renderAvatar() {
    return (
      <div className="sub-header avatar">
        <PageHeader>Avatar</PageHeader>
        <Well>
          <p>
            Set a custom avatar for Platters by registering at Gravatar with
            your email address.
          </p>

          <p>
            Gravatar is a global free avatar service used by many applications
            including: Wordpress, Github and Stackoverflow. Click on the avatar
            below to be taken to Gravatar.
          </p>

          <a href="https://gravatar.com">
            <img
              className="img-responsive"
              src={this.gravatarURL()}
              alt={this.user.name}
            />
          </a>
        </Well>
      </div>
    );
  }

  renderDeleteAccount() {
    return (
      <div className="sub-header">
        <PageHeader>Delete account</PageHeader>
        <Well>
          <p>
            Once you delete your account all your comments will also be deleted,
            there is no going back. Please be certain!
          </p>
          <Button
            type="submit"
            bsStyle="danger"
            bsSize="small"
            onClick={this.handleDeleteAccount}
          >
            Delete account
          </Button>
        </Well>
      </div>
    );
  }

  render() {
    if (this.userSlug !== this.user.slug) {
      toastAlert(
        `Can not display user account for ${
          this.userSlug
        }, it does not match the current logged in user`
      );
      return <Redirect to="/" />;
    }

    return (
      <Row>
        <Col md={10} mdOffset={1} className="UserAccount">
          {this.renderAccount()}
          {this.renderAvatar()}
          {this.renderDeleteAccount()}
        </Col>
      </Row>
    );
  }
}

export default UserAccountPage;
