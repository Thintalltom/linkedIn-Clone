import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './store'; // Adjust the import according to your store file location
import { postUser, delUser, fetchUser } from './features/apiSlice';

const Content: React.FC = () => {
  const dispatch = useDispatch();
  const { data, error, postLoading } = useSelector((state: RootState) => state.user);


  const handlePostUser = () => {
    dispatch(postUser());
  };
  

  const handleDelete = (userId: number) => {
    dispatch(delUser(userId));
    console.log(userId)
  };

  if (postLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  return (
    <div>
    <button onClick={handlePostUser}>Post User</button>
    {data && data.map((user: any, index: any) => (
        <div key={index}>
          <h3>{user.title}</h3>
          <p>{user.body}</p> 
          <button onClick={() => handleDelete(user.id)}>Delete</button>
        </div>
      ))}
  </div>
  );
};

export default Content;
