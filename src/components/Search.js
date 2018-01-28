import React from 'react';
import { Row, Col, FormGroup, FormControl } from 'react-bootstrap';
import _ from 'lodash';
import '../styles/Search.css';

const Search = ({ placeholder, onSearch }) => {
  const debouncedSearch = _.debounce(term => { onSearch(term) }, 300);

  return (
    <Row className="Search">
      <Col xs={6} xsOffset={3}>
        <form onSubmit={onSearch}>
          <FormGroup>
            <FormControl
              type="text"
              bsSize="sm"
              placeholder={placeholder}
              onChange={event => debouncedSearch(event.target.value)}
            />
          </FormGroup>
        </form>
      </Col>
    </Row>
  );
};

export default Search;
