import React from 'react';

function User({ first, last }) {
  return (
    <div>
      <h1>
        `{first} {last}`
      </h1>
    </div>
  );
}

export default User;
