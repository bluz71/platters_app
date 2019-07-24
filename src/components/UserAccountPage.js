import React, { Component } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
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
} from 'react-bootstrap'
import FontAwesome from 'react-fontawesome'
import md5 from 'md5'
import { API_HOST } from '../config'
import { appAuth } from '../lib/appAuth'
import { toastAlert, toastNotice } from '../helpers/toastMessage'
import '../styles/UserAccountPage.css'

class UserAccountPage extends Component {
  constructor (props) {
    super(props)

    this.userSlug = props.match.params.id
    this.userUserEndPoint = `${API_HOST}/api/users/${this.userSlug}`

    this.user = appAuth.currentUser()
    document.title = `Platters App - ${this.userSlug}`

    this.state = {
      updateButtonText: 'Update',
      nameErrors: []
    }

    // Bind 'this' for callback functions.
    this.handleUserUpdate = this.handleUserUpdate.bind(this)
    this.handleDeleteAccount = this.handleDeleteAccount.bind(this)
    this.handleNameBlur = this.handleNameBlur.bind(this)
  }

  handleUserUpdate (event) {
    event.preventDefault()

    this.setState({
      updateButtonText: (
        <div>
          <FontAwesome name='spinner' spin pulse /> Updating...
        </div>
      )
    })

    const userUpdate = {
      user: {
        name: this.nameInput.value,
        password: this.passwordInput.value
      }
    }

    this.putUserUpdate(userUpdate)
  }

  handleDeleteAccount () {
    if (!window.confirm('Are you sure you want to delete your account?')) {
      return
    }

    this.deleteUser()
  }

  handleNameBlur () {
    const name = this.nameInput.value
    if (name.length < 4 || name.length > 20) {
      this.setState({
        nameErrors: ['Account name must be between 4 and 20 characters long']
      })
    } else {
      this.setState({ nameErrors: [] })
    }
  }

  async putUserUpdate (userUpdate) {
    axios
      .put(this.userUserEndPoint, userUpdate, await appAuth.headers())
      .then(response => {
        this.setState({ updateButtonText: 'Update' })
        appAuth.logIn(response.data.auth_token)
        toastNotice('Your account has been successfully updated')
        this.props.history.push('/')
      })
      .catch(error => {
        this.setState({ updateButtonText: 'Update' })
        if (error.response && error.response.status === 400) {
          toastAlert('You can only update your own account')
        } else if (error.response && error.response.status === 406) {
          toastAlert('Your account could not be updated')
          this.setState({
            nameErrors: error.response.data.errors
          })
        } else if (error.response && error.response.status === 404) {
          toastAlert(`The user '${this.userSlug}' does not exist`)
          this.props.history.push('/password/new')
        } else {
          toastAlert('Server error, please try again later')
        }
      })
  }

  async deleteUser () {
    axios
      .delete(this.userUserEndPoint, await appAuth.headers())
      .then(response => {
        appAuth.logOut()
        toastNotice('Your account has been successfully deleted')
        this.props.history.push('/')
      })
      .catch(error => {
        if (error.response && error.response.status === 400) {
          toastAlert('You can only delete your own account')
        } else if (error.response && error.response.status === 404) {
          toastAlert(`The user '${this.userSlug}' does not exist`)
          this.props.history.push('/password/new')
        } else {
          toastAlert('Server error, please try again later')
        }
      })
  }

  gravatarURL () {
    const hash = md5(this.user.email.trim().toLowerCase())

    return `https://gravatar.com/avatar/${hash}?s=160&r=pg&d=identicon`
  }

  renderNameErrors () {
    return this.state.nameErrors.map((error, index) => (
      <li key={index} className='list-group-item list-group-item-danger'>
        {error}
      </li>
    ))
  }

  renderAccount () {
    return (
      <div>
        <PageHeader>
          Account <small>{this.user.email}</small>
        </PageHeader>
        <Well>
          <Form horizontal onSubmit={this.handleUserUpdate}>
            <ul className='list-group'>{this.renderNameErrors()}</ul>

            <FormGroup>
              <Col componentClass={ControlLabel} md={2}>
                Name
              </Col>
              <Col md={9}>
                <FormControl
                  type='text'
                  defaultValue={this.user.name}
                  className='name'
                  inputRef={input => (this.nameInput = input)}
                  onBlur={this.handleNameBlur}
                />
              </Col>
            </FormGroup>

            <FormGroup>
              <Col componentClass={ControlLabel} md={2}>
                Password
              </Col>
              <Col md={9}>
                <FormControl
                  type='password'
                  className='password'
                  inputRef={input => (this.passwordInput = input)}
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
                  type='submit'
                  bsStyle='success'
                  bsSize='small'
                  className='account-update'
                >
                  {this.state.updateButtonText}
                </Button>
              </Col>
            </FormGroup>
          </Form>
        </Well>
      </div>
    )
  }

  renderAvatar () {
    return (
      <div className='sub-header avatar'>
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

          <a href='https://gravatar.com'>
            <img
              className='img-responsive'
              src={this.gravatarURL()}
              alt={this.user.name}
            />
          </a>
        </Well>
      </div>
    )
  }

  renderDeleteAccount () {
    return (
      <div className='sub-header'>
        <PageHeader>Delete account</PageHeader>
        <Well>
          <p>
            Once you delete your account all your comments will also be deleted,
            there is no going back. Please be certain!
          </p>
          <Button
            type='submit'
            bsStyle='danger'
            bsSize='small'
            className='account-delete'
            onClick={this.handleDeleteAccount}
          >
            Delete account
          </Button>
        </Well>
      </div>
    )
  }

  render () {
    if (!this.user || this.userSlug !== this.user.slug) {
      toastAlert(
        `Can not display '${
          this.userSlug
        }' user account, you may only access your own account`
      )
      return <Redirect to='/' />
    }

    return (
      <Row>
        <Col md={10} mdOffset={1} className='UserAccount'>
          {this.renderAccount()}
          {this.renderAvatar()}
          {this.renderDeleteAccount()}
        </Col>
      </Row>
    )
  }
}

export default UserAccountPage
