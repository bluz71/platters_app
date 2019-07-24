import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Row, Col, FormGroup, FormControl } from 'react-bootstrap'
import debounce from 'lodash/debounce'
import '../styles/Search.css'

class Search extends Component {
  constructor (props) {
    super(props)

    this.debouncedSearch = debounce(term => {
      this.props.onSearchChange(term)
    }, 500)

    // Bind 'this' for callback functions.
    this.focusSearchInput = this.focusSearchInput.bind(this)
  }

  focusSearchInput () {
    this.searchInput.focus()
  }

  value () {
    return this.searchInput.value
  }

  render () {
    return (
      <Row className='Search'>
        <Col xs={6} xsOffset={3}>
          <form onSubmit={this.props.onSearchSubmit}>
            <FormGroup>
              <FormControl
                type='text'
                bsSize='sm'
                placeholder={this.props.placeholder}
                onChange={event => this.debouncedSearch(event.target.value)}
                inputRef={input => (this.searchInput = input)}
              />
            </FormGroup>
          </form>
        </Col>
      </Row>
    )
  }
}

Search.propTypes = {
  onSearchChange: PropTypes.func,
  onSearchSubmit: PropTypes.func,
  placeholder: PropTypes.string
}

export default Search
