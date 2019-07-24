import React, { Component } from 'react'
import axios from 'axios'
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
} from 'react-bootstrap'
import FontAwesome from 'react-fontawesome'
import { API_HOST, APPLICATION_HOST } from '../config'
import { toastAlert, toastNotice } from '../helpers/toastMessage'

const PASSWORD_CHANGE_ENDPOINT = `${API_HOST}/api/passwords`

class PasswordNew extends Component {
  constructor (props) {
    super(props)

    document.title = 'Platters App'

    this.state = {
      submitButtonText: 'Submit'
    }

    // Bind 'this' for callback functions.
    this.handleResetSubmit = this.handleResetSubmit.bind(this)
  }

  handleResetSubmit (event) {
    event.preventDefault()

    this.setState({
      submitButtonText: (
        <div>
          <FontAwesome name='spinner' spin pulse /> Submitting...
        </div>
      )
    })

    const passwordReset = {
      password_reset: {
        email_address: this.emailAddressInput.value,
        application_host: APPLICATION_HOST
      }
    }

    this.postPasswordReset(passwordReset)
  }

  postPasswordReset (passwordReset) {
    axios
      .post(PASSWORD_CHANGE_ENDPOINT, passwordReset)
      .then(response => {
        this.setState({ submitButtonText: 'Submit' })
        toastNotice(
          'You will receive an email within the next few minutes. It contains instructions for changing your password.'
        )
        this.props.history.push('/')
      })
      .catch(error => {
        this.setState({ submitButtonText: 'Submit' })
        if (error.response && error.response.status === 404) {
          toastAlert(
            'Invalid email address, no user with that email address is registered'
          )
        } else {
          toastAlert('Server error, please try again later')
        }
      })
  }

  renderExplanation () {
    return (
      <p>
        To be emailed a link to reset your password, please enter your email
        address.
      </p>
    )
  }

  renderForm () {
    return (
      <Well>
        <Form horizontal onSubmit={this.handleResetSubmit}>
          <ul className='list-group' />

          <FormGroup>
            <Col componentClass={ControlLabel} md={2}>
              Email address
            </Col>
            <Col md={9}>
              <FormControl
                type='email'
                className='email'
                inputRef={input => (this.emailAddressInput = input)}
              />
            </Col>
          </FormGroup>

          <FormGroup>
            <Col mdOffset={2} md={9}>
              <Button
                type='submit'
                bsStyle='success'
                bsSize='small'
                className='submit'
              >
                {this.state.submitButtonText}
              </Button>
            </Col>
          </FormGroup>
        </Form>
      </Well>
    )
  }

  render () {
    return (
      <Row className='PasswordNew'>
        <Col md={10} mdOffset={1}>
          <PageHeader>Reset your password</PageHeader>
          {this.renderExplanation()}
          {this.renderForm()}
        </Col>
      </Row>
    )
  }
}

export default PasswordNew
