import React from 'react';

const UserCommentsPage = (props) => {
  const { id } = props.match.params;

  return (
    <h1>User Comments for {id}</h1>
  );
};

export default UserCommentsPage;
