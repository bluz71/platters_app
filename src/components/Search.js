import React from 'react';
import { Row, Col, FormGroup, FormControl } from 'react-bootstrap';
import debounce from 'lodash/debounce';
import '../styles/Search.css';

const Search = ({ placeholder, onSearchChange, onSearchSubmit }) => {
  const debouncedSearch = debounce(term => { onSearchChange(term) }, 500);

  return (
    <Row className="Search">
      <Col xs={6} xsOffset={3}>
        <form onSubmit={onSearchSubmit}>
          <FormGroup>
            <FormControl
              type="text"
              bsSize="sm"
              placeholder={placeholder}
              onChange={event => debouncedSearch(event.target.value)}
              autoFocus
              name="search"
            />
          </FormGroup>
        </form>
      </Col>
    </Row>
  );
};

export default Search;
