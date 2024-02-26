import './CardsDraftsPosts.scss';
import { toast } from 'react-toastify';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useRemoveDraftPostMutation } from '../../store';
import ModalEditNameDraftPost from './ModalEditNameDaftPost';

const CardsDraftsPosts = ({ draftPosts }) => {
  const [removeDraftPost] = useRemoveDraftPostMutation();

  const handleDelete = async (id) => {
    try {
      await removeDraftPost(id);
      toast.success('Produto excluído com sucesso');
    } catch (err) {
      console.log(err);
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <Container className="p-0">
      {draftPosts.map((p) => (
        <Card key={p._id} className="draft-post-card">
          <Card.Body as={Row}>
            <Col xs={12} sm={8} md={10} className="p-0">
              <Card.Title>
                <ModalEditNameDraftPost post={p}>
                  {p.title}
                </ModalEditNameDraftPost>
              </Card.Title>
              <Card.Text>{p.subtitle}</Card.Text>
            </Col>
            <Col className="d-flex d-sm-block my-md-auto p-0">
              <div className="w-md-100 text-end mt-auto my-md-auto">
                <Button
                  className="m-1 ms-0"
                  onClick={() => handleDelete(p._id)}
                >
                  Exluir
                </Button>
              </div>
              <div className="w-md-100 text-end mt-auto my-md-auto">
                <Button
                  className="m-1 ms-0"
                  as={Link}
                  to={`/admin/posts/draft/${p.name}`}
                >
                  Editar
                </Button>
              </div>
            </Col>
          </Card.Body>
        </Card>
      ))}
    </Container>
  );
};

export default CardsDraftsPosts;
