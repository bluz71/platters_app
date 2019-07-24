import React from 'react'
import PropTypes from 'prop-types'
import { Pagination } from 'react-bootstrap'

const Paginator = ({ pagination, onPageChange }) => {
  /* eslint-disable camelcase */
  const { current_page, total_pages } = pagination

  return (
    <Pagination
      prev={current_page !== 1}
      next={current_page !== total_pages}
      first={current_page !== 1}
      last={current_page !== total_pages}
      ellipsis
      boundaryLinks
      items={total_pages}
      maxButtons={7}
      activePage={current_page}
      onSelect={onPageChange}
    />
  )
  /* eslint-disable camelcase */
}

Paginator.propTypes = {
  pagination: PropTypes.object,
  onPageChange: PropTypes.func
}

export default Paginator
