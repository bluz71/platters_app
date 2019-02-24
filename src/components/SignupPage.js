import React, { Component } from 'react';
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

class SignupPage extends Component {
  constructor(props) {
    super(props);

    document.title = 'Platters App';

    this.state = {
      signUpButtonText: 'Submit',
      nameErrors: []
    };

    // Bind 'this' for callback functions.
    this.handleAccountSubmit = this.handleAccountSubmit.bind(this);
    this.handleNameBlur = this.handleNameBlur.bind(this);
    this.handleNameFocus = this.handleNameFocus.bind(this);
  }

  handleAccountSubmit(event) {
    event.preventDefault();
  }

  handleNameBlur() {
    const name = this.nameInput.value;
    if (name.length < 4 || name.length > 20) {
      this.setState({
        nameErrors: ['Account name must be between 4 and 20 characters long']
      });
    } else {
      this.setState({ nameErrors: [] });
    }
  }

  handleNameFocus() {
    this.forceUpdate();
  }

  renderNameErrors() {
    if (this.nameInput === document.activeElement) {
      return;
    }

    return this.state.nameErrors.map((error, index) => (
      <li key={index} className="list-group-item list-group-item-danger">
        {error}
      </li>
    ));
  }

  hasNameErrors() {
    if (
      this.state.nameErrors.length > 0 &&
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

          <FormGroup>
            <Col mdOffset={2} md={9}>
              <Button
                type="submit"
                bsStyle="success"
                bsSize="small"
                className="submit"
              >
                {this.state.signUpButtonText}
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
