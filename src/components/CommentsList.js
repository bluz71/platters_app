import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import axios from 'axios'
import linkify from 'linkify-lite'
import simpleFormat from '../helpers/simpleFormat'
import FontAwesome from 'react-fontawesome'
import { toastAlert } from '../helpers/toastMessage'
import { VelocityTransitionGroup } from 'velocity-react'
import '../styles/CommentsList.css'
import { appAuth } from '../lib/appAuth'
import { API_HOST } from '../config'

const postedIn = comment => {
  if (comment.for === 'Album') {
    return ` posted in ${comment.artist} / `
  } else {
    return ' posted in '
  }
}

const handleDelete = async (comment, onDeleteComment) => {
  if (!window.confirm('Are you sure you want to remove this comment?')) {
    return
  }

  const deleteCommentEndPoint = `${API_HOST}${comment.delete_path}.json`
  axios
    .delete(deleteCommentEndPoint, await appAuth.headers())
    .then(response => {
      onDeleteComment(comment.id)
    })
    .catch(error => {
      if (error.response && error.response.status === 404) {
        toastAlert(
          'Comment deletion failed due to permission or not found issue'
        )
      } else if (error.tokenMessage) {
        toastAlert(error.tokenMessage)
      } else {
        toastAlert('Server error, please try again later')
      }
    })
}

const renderDeleteComment = (comment, onDeleteComment) => {
  if (
    appAuth.isLoggedIn() &&
    (appAuth.currentUser().name === comment.user_name ||
      appAuth.currentUser().admin)
  ) {
    return (
      <span
        onClick={() => handleDelete(comment, onDeleteComment)}
        className='icon'
      >
        <FontAwesome name='trash' />
      </span>
    )
  }
}

const renderComments = (comments, onDeleteComment, shortHeader) =>
  comments.map(comment => (
    <div key={comment.id} className='Comment'>
      <Link to={`/comments/${comment.user_slug}`}>
        <img
          className='img-responsive center-block'
          src={comment.gravatar_url}
          alt={comment.user_name}
        />
      </Link>
      <h2>
        <Link to={`/comments/${comment.user_slug}`}>{comment.user_name}</Link>
        {!shortHeader && (
          <small>
            {postedIn(comment)}
            <Link
              to={{
                pathname: `/${comment.path}`,
                state: { scrollToComments: true }
              }}
            >
              {comment.name}
            </Link>
          </small>
        )}
      </h2>
      {renderDeleteComment(comment, onDeleteComment)}
      <h3 dangerouslySetInnerHTML={{ __html: comment.created_at }} />
      <div
        dangerouslySetInnerHTML={{
          __html: linkify(simpleFormat(comment.body))
        }}
      />
    </div>
  ))

const CommentsList = ({ comments, onDeleteComment, shortHeader }) => (
  <div className='CommentsList'>
    <VelocityTransitionGroup
      enter={{ animation: 'fadeIn', duration: 500 }}
      leave={{ animation: 'fadeOut', duration: 500 }}
    >
      {renderComments([...comments.values()], onDeleteComment, shortHeader)}
    </VelocityTransitionGroup>
  </div>
)

CommentsList.defaultTypes = {
  shortHeader: false
}

CommentsList.propTypes = {
  comments: PropTypes.instanceOf(Map),
  onDeleteComment: PropTypes.func,
  shortHeader: PropTypes.bool
}

export default CommentsList
