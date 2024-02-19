import React from 'react';
import Container from 'react-bootstrap/Container';
import Loader from '../components/Loader';
import { ToastContainer } from 'react-toastify';
import { useGetProfileQuery } from '../store';
import ShowUserProfile from '../components/ShowUserProfile';

const ShowUserPage = () => {
  const { data, error, isLoading } = useGetProfileQuery();
  let content;
  if (isLoading) {
    content = <Loader />;
  } else if (error) {
    content = <div>error</div>;
  } else {
    content = (
      <Container className="p-0">
        <ShowUserProfile user={data} />
        <ToastContainer />
      </Container>
    );
  }

  return <>{content}</>;
};

export default ShowUserPage;
