import React from 'react';
import { Container } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';
import SearchTag from '../components/tags/SearchTag';
import TagsList from '../components/tags/TagsList';

const TagsPage = () => {
  return (
    <Container className="p-0">
      <Container>
        <SearchTag url="/admin/tags" />
      </Container>
      <div className="m-auto">
        <TagsList />
      </div>
      <ToastContainer />
    </Container>
  );
};

export default TagsPage;
