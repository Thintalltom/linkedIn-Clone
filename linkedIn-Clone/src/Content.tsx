import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from './features/apiSlice';
import { RootState } from './store'; // Adjust the import according to your store file location

const Content: React.FC = () => {
  const dispatch = useDispatch();
  const { isLoading, data, error } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  return (
    <div>
      {data && data.map((user: any) => ( // Replace `any` with the appropriate type if known
        <div key={user.id}>
          <h3>{user.name}</h3>
          <p>{user.email}</p>
        </div>
      ))}
    </div>
  );
};

export default Content;
