import styles from './CardsPosts.module.scss';
import { toast } from 'react-toastify';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useRemovePostMutation } from '../../store';

const CardsPosts = ({ posts }) => {
  const [removePost] = useRemovePostMutation();

  const handleDelete = async (id) => {
    try {
      await removePost(id);
      toast.success('Post excluído com sucesso');
    } catch (err) {
      console.log(err);
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <Container className="p-0">
      {posts.map((p) => (
        <Card key={p._id} className={styles.postCard}>
          <Card.Body as={Row} className={styles.cardBody}>
            <Card.Title className={styles.cardTitle}>{p.title}</Card.Title>
            <Card.Text className={styles.cardText}>{p.subtitle}</Card.Text>
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
                  to={`/admin/posts/${p._id}`}
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

export default CardsPosts;
