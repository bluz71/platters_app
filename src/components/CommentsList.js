import React from 'react';
import { Link } from 'react-router-dom';
import linkifyUrls from 'linkify-urls';
import '../styles/CommentsList.css';

// Code snippet provided by:
//   https://makandracards.com/makandra/1395-simple_format-helper-for-javascript
const simpleFormat = (str) => {
  str = str.replace(/\r\n?/, '\n');
  str = str.trim();

  if (str.length > 0) {
    str = str.replace(/\n\n+/g, '</p><p>');
    str = str.replace(/\n/g, '<br />');
    str = `<p>${str}</p>`;
  }

  return str;
};

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
    <div className="Comment">
      <Link to={`/comments/${comment.user_slug}`}>
        <img className="img-responsive center-block" src={comment.gravatar_url} alt={comment.user_name} />
      </Link>
      <h2>
        <Link to={`/comments/${comment.user_slug}`}>{comment.user_name}</Link>
        <small>
          {postedIn(comment)}
          <Link to={comment.path}>{comment.name}</Link>
        </small>
      </h2>
      <h3 dangerouslySetInnerHTML={{ __html: comment.created_at }} />
      <div dangerouslySetInnerHTML={{ __html: linkifyUrls(simpleFormat(comment.body)) }} />
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

export default CommentsList;
