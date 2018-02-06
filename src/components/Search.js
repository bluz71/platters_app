import React, { Component } from 'react';
import { Row, Col, FormGroup, FormControl } from 'react-bootstrap';
import debounce from 'lodash/debounce';
import '../styles/Search.css';

class Search extends Component {
  constructor(props) {
    super(props);

    this.debouncedSearch = debounce(term => { this.props.onSearchChange(term); }, 500);
  }

  focusSearchInput = () => {
    this.searchInput.focus();
  }

  render() {
    return (
      <Row className="Search">
        <Col xs={6} xsOffset={3}>
          <form onSubmit={this.props.onSearchSubmit}>
            <FormGroup>
              <FormControl
                type="text"
                bsSize="sm"
                placeholder={this.props.placeholder}
                onChange={event => this.debouncedSearch(event.target.value)}
                name="search"
                inputRef={(input) => this.searchInput = input}
              />
            </FormGroup>
          </form>
        </Col>
      </Row>
    );
  }
}

export default Search;
