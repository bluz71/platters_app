import React, { Component } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import queryString from 'query-string'
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
import { API_HOST } from '../config'
import { appAuth } from '../lib/appAuth'
import { toastAlert, toastNotice } from '../helpers/toastMessage'

class PasswordEditPage extends Component {
  constructor (props) {
    super(props)

    document.title = 'Platters App'

    this.state = {
      submitButtonText: 'Submit'
    }

    this.userSlug = props.match.params.user_id
    this.passwordChangeEndPoint = `${API_HOST}/api/users/passwords/${
      this.userSlug
    }/password`

    const params = queryString.parse(props.location.search)
    this.changeToken = Object.prototype.hasOwnProperty.call(params, 'token')
      ? params.token
      : ''

    // Strip the change token parameter from the URL and redirect to the shortened
    // URL.
    const url = `/users/${this.userSlug}/password/edit`
    props.history.replace(url)

    // Bind 'this' for callback functions.
    this.handleChangeSubmit = this.handleChangeSubmit.bind(this)
  }

  handleChangeSubmit (event) {
    event.preventDefault()

    this.setState({
      submitButtonText: (
        <div>
          <FontAwesome name='spinner' spin pulse /> Submitting...
        </div>
      )
    })

    const passwordChange = {
      password_change: {
        password: this.passwordInput.value,
        token: this.changeToken
      }
    }

    this.putPasswordChange(passwordChange)
  }

  putPasswordChange (passwordChange) {
    axios
      .put(this.passwordChangeEndPoint, passwordChange)
      .then(response => {
        this.setState({ submitButtonText: 'Submit' })
        appAuth.logIn(response.data.auth_token)
        toastNotice('Your password has been successfully reset')
        this.props.history.push('/')
      })
      .catch(error => {
        this.setState({ submitButtonText: 'Submit' })
        if (error.response && error.response.status === 400) {
          toastAlert(
            'Incorrect confirmation token, please retry resetting your password again'
          )
          this.props.history.push('/password/new')
        } else if (error.response && error.response.status === 406) {
          toastAlert(
            'Password could not be changed, please make sure the new password is at least 9 characters long'
          )
          this.passwordInput.value = ''
        } else {
          toastAlert('Server error, please try again later')
        }
      })
  }

  renderExplanation () {
    return <p>Your password will be reset. Choose a new password below.</p>
  }

  renderForm () {
    return (
      <Well>
        <Form horizontal onSubmit={this.handleChangeSubmit}>
          <ul className='list-group' />

          <FormGroup>
            <Col componentClass={ControlLabel} md={2}>
              Choose password
            </Col>
            <Col md={9}>
              <FormControl
                type='password'
                className='password'
                inputRef={input => (this.passwordInput = input)}
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
    if (this.changeToken.length !== 40) {
      toastAlert(
        'Invalid password reset token, expecting a 40 character token, please click the email link again'
      )
      return <Redirect to='/' />
    }

    return (
      <Row className='PasswordEdit'>
        <Col md={10} mdOffset={1}>
          <PageHeader>Change your password</PageHeader>
          {this.renderExplanation()}
          {this.renderForm()}
        </Col>
      </Row>
    )
  }
}

export default PasswordEditPage
