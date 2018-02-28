import React from 'react';
import PropTypes from 'prop-types';
import { Pagination } from 'react-bootstrap';

const Paginator = ({ pagination, onPageChange }) => {
  const { current_page, total_pages } = pagination;

  return (
    <Pagination
      prev={current_page === 1 ? false : true}
      next={current_page === total_pages ? false : true}
      first={current_page === 1 ? false : true}
      last={current_page === total_pages ? false : true}
      ellipsis
      boundaryLinks
      items={total_pages}
      maxButtons={7}
      activePage={current_page}
      onSelect={onPageChange}
    />
  );
};

Paginator.propTypes = {
  pagination: PropTypes.object,
  onPageChange: PropTypes.func
};

export default Paginator;
