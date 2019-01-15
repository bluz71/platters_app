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
  Button
} from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';

class PasswordNew extends Component {
  constructor(props) {
    super(props);

    this.state = {
      submitButtonText: 'Submit'
    };

    // Bind 'this' for callback functions.
    this.handleResetSubmit = this.handleResetSubmit.bind(this);
  }

  handleResetSubmit(event) {
    event.preventDefault();

    this.setState({
      submitButtonText: (
        <div>
          <FontAwesome name="spinner" spin pulse /> Submitting...
        </div>
      )
    });
  }

  renderExplanation() {
    return (
      <p>
        To be emailed a link to reset your password, please enter your email
        address.
      </p>
    );
  }

  renderForm() {
    return (
      <Well>
        <Form horizontal onSubmit={this.handleResetSubmit}>
          <ul className="list-group" />

          <FormGroup>
            <Col componentClass={ControlLabel} md={2}>
              Email address
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
      <Row className="PasswordNew">
        <Col md={10} mdOffset={1}>
          <PageHeader>Reset your password</PageHeader>
          {this.renderExplanation()}
          {this.renderForm()}
        </Col>
      </Row>
    );
  }
}

export default PasswordNew;
