import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import { FormUpdateDraftPost, ViewDraftPost } from '../components/draftsPosts';
import { useGetDraftPostByNameQuery } from '../store';
import Loader from '../components/Loader';
import { useParams } from 'react-router-dom';

const ShowDraftPostPage = () => {
  const { name } = useParams();
  const { data, isLoading, error } = useGetDraftPostByNameQuery(name);

  let content;

  if (isLoading) {
    content = <Loader />;
  } else if (error) {
    toast.error('Erro ao carregar rascunho');
    content = <p>Erro</p>;
  } else {
    content = (
      <Row>
        <Col>
          <FormUpdateDraftPost post={data} />
        </Col>
        <Col>
          <ViewDraftPost post={data} />
        </Col>
      </Row>
    );
  }

  return (
    <Container className="p-0">
      {content}
      <ToastContainer />
    </Container>
  );
};

export default ShowDraftPostPage;
