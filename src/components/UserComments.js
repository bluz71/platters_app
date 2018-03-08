import React from 'react';

const UserComments = (props) => {
  const { id } = props.match.params;

  return (
    <h1>User Comments for {id}</h1>
  );
};

export default UserComments;
