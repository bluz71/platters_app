import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import linkify from 'linkify-lite';
import simpleFormat from '../helpers/simpleFormat';
import '../styles/CommentsList.css';

const postedIn = (comment) => {
  if (comment.for === 'Album') {
    return ` posted in ${comment.artist} / `;
  }
  else {
    return ' posted in ';
  }
};

const renderComments = (comments) => (
  comments.map(comment =>
    <div key={comment.id} className="Comment">
      <Link to={`/comments/${comment.user_slug}`}>
        <img className="img-responsive center-block" src={comment.gravatar_url} alt={comment.user_name} />
      </Link>
      <h2>
        <Link to={`/comments/${comment.user_slug}`}>
          {comment.user_name}
        </Link>
        <small>
          {postedIn(comment)}
          <Link to={`/${comment.path}`}>{comment.name}</Link>
        </small>
      </h2>
      <h3 dangerouslySetInnerHTML={{ __html: comment.created_at }} />
      <div dangerouslySetInnerHTML={{ __html: linkify(simpleFormat(comment.body)) }} />
    </div>
  )
);

const CommentsList = ({ comments }) => {
  return (
    <div className="CommentsList">
      {renderComments(comments)}
    </div>
  );
};

CommentsList.propTypes = {
  comments: PropTypes.array
};

export default CommentsList;
