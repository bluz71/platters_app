// @flow
import React from 'react';
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

export default Paginator;
