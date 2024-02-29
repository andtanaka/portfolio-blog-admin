import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import FormUpdatePost from '../components/posts/FormUpdatePost';
import { useParams } from 'react-router-dom';
import { useGetPostByIdQuery } from '../store';
import Loader from '../components/Loader';
import { ViewDraftPost } from '../components/draftsPosts';

const ShowPostPage = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useGetPostByIdQuery(id);
  let content;

  if (isLoading) {
    content = <Loader />;
  } else if (error) {
    toast.error('Erro ao carregar post');
    content = <p>Erro</p>;
  } else {
    content = (
      <Row>
        <Col xs={{ span: 12 }} lg={{ span: 6 }}>
          <FormUpdatePost post={data.post} tagsOptions={data.tagsOptions} />
        </Col>
        <Col xs={{ span: 12 }} lg={{ span: 6 }}>
          <ViewDraftPost post={data.post} />
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

export default ShowPostPage;
