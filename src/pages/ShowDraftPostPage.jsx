import { Container, Row, Col } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import { FormUpdateDraftPost, ViewDraftPost } from '../components/draftsPosts';
import { useGetDraftPostByIdQuery } from '../store';
import Loader from '../components/Loader.jsx';
import { useParams } from 'react-router-dom';

const ShowDraftPostPage = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useGetDraftPostByIdQuery(id);

  let content;

  if (isLoading) {
    content = <Loader />;
  } else if (error) {
    toast.error('Erro ao carregar rascunho');
    content = <p>Erro</p>;
  } else {
    content = (
      <Row>
        <Col xs={{ span: 12 }} lg={{ span: 6 }}>
          <FormUpdateDraftPost
            post={data.post}
            tagsOptions={data.tagsOptions}
          />
        </Col>
        <Col xs={{ span: 12 }} lg={{ span: 6 }}>
          <ViewDraftPost post={data.post} />
        </Col>
      </Row>
    );
  }

  return (
    <Container>
      {content}
      <ToastContainer />
    </Container>
  );
};

export default ShowDraftPostPage;
