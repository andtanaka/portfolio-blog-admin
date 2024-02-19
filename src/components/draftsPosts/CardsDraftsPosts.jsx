import './CardsDraftsPosts.scss';
import { FaEdit, FaRegTrashAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { Button, Card, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const CardsDraftsPosts = ({ draftPosts }) => {
  // const handleDelete = async (id) => {
  //   try {
  //     await removeProduct(id);
  //     toast.success('Produto excluído com sucesso');
  //   } catch (err) {
  //     console.log(err);
  //     toast.error(err?.data?.message || err.error);
  //   }
  // };

  return (
    <Container>
      {draftPosts.map((p) => (
        <Card key={p._id}>
          <Card.Body>
            <Card.Title>{p.title}</Card.Title>
            <Card.Text>{p.subtitle}</Card.Text>
            <Button as={Link} to={`/admin/posts/draft/${p.name}`}>
              Ler mais
            </Button>
          </Card.Body>
        </Card>
      ))}
    </Container>
  );
};

export default CardsDraftsPosts;
