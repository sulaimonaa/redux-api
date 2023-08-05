import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import User from './User';
import { fetchUsers } from '../users/usersSlice';

function Users() {
  const { data, isLoading, error } = useSelector((state) => state.users);
  const dispath = useDispatch();
  useEffect(() => {
    dispath(fetchUsers());
  }, []);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  if (error) {
    return <h1>{error}</h1>;
  }
  return (
    <ul>
      {data.map((user) => (
        <User {...user} key={user.uuid} />
      ))}
    </ul>
  );
}

export default Users;
