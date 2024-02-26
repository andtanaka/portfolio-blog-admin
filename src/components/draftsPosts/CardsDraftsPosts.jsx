import styles from './CardsDraftsPosts.module.scss';
import { toast } from 'react-toastify';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useRemoveDraftPostMutation } from '../../store';
import ModalEditTitleDraftPost from './ModalEditTitleDaftPost';

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
        <Card key={p._id} className={styles.draftPostCard}>
          <Card.Body as={Row} className={styles.cardBody}>
            <ModalEditTitleDraftPost post={p}>
              <Card.Title className={styles.cardTitle}>{p.title}</Card.Title>
              <Card.Text className={styles.cardText}>{p.subtitle}</Card.Text>
            </ModalEditTitleDraftPost>

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
