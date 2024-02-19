import React from 'react';
import { Container } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';
import { FormPost } from '../components/posts';

const ShowPostPage = () => {
  return (
    <Container className="p-0">
      <FormPost />
      <ToastContainer />
    </Container>
  );
};

export default ShowPostPage;
