import styles from './CardsDraftsPosts.module.scss';
import { toast } from 'react-toastify';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useRemoveDraftPostMutation } from '../../store';

const CardsDraftsPosts = ({ draftPosts }) => {
  const [removeDraftPost] = useRemoveDraftPostMutation();
  const navigate = useNavigate();

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
            <Col
              onClick={() => navigate(`/admin/posts/draft/${p._id}/preview`)}
              xs={12}
              sm={8}
              md={10}
              className={styles.buttonArea}
            >
              <Card.Title className={styles.cardTitle}>{p.title}</Card.Title>
              <Card.Text className={styles.cardText}>{p.subtitle}</Card.Text>
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
                {p.posted ? null : (
                  <Button
                    className="m-1 ms-0"
                    as={Link}
                    to={`/admin/posts/draft/${p._id}`}
                  >
                    Editar
                  </Button>
                )}
              </div>
            </Col>
          </Card.Body>
        </Card>
      ))}
    </Container>
  );
};

export default CardsDraftsPosts;
