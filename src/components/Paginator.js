import React from 'react';
import { Pagination } from 'react-bootstrap';

const Paginator = (props) => {
  return (
    <Pagination
      prev
      next
      first
      last
      ellipsis
      boundaryLinks
      items={props.pagination.total_pages}
      maxButtons={7}
      activePage={props.pagination.current_page}
      onSelect={props.onPage}
    />
  );
};

export default Paginator;
