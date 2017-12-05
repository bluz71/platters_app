// @flow
import React from 'react';
import { Pagination } from 'react-bootstrap';

const Paginator = ({ pagination, onPageChange }) => {
  return (
    <Pagination
      prev={pagination.current_page === 1 ? false : true}
      next={pagination.current_page === pagination.total_pages ? false : true}
      first={pagination.current_page === 1 ? false : true}
      last={pagination.current_page === pagination.total_pages ? false : true}
      ellipsis
      boundaryLinks
      items={pagination.total_pages}
      maxButtons={7}
      activePage={pagination.current_page}
      onSelect={onPageChange}
    />
  );
};

export default Paginator;
