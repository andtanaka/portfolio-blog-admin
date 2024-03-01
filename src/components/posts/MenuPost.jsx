import styles from './MenuPost.module.scss';
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';
import { GrOverview } from 'react-icons/gr';

const MenuPost = ({ post }) => {
  const navigate = useNavigate();
  console.log(post); //está dando undefined

  return (
    <Container className={styles.menuContainer}>
      <div
        className={styles.buttonIcon}
        onClick={() => {
          console.log('redirecionar para a página de edição');
          // navigate(`/admin/posts/:id`)
        }}
      >
        <div className={styles.icon}>
          <FaEdit />
        </div>
        <p className={styles.textIcon}>Editar</p>
      </div>
      <div
        className={styles.buttonIcon}
        onClick={() => console.log('Navega para a página do blog')}
      >
        <div className={styles.icon}>
          <GrOverview />
        </div>
        <p className={styles.textIcon}>Ver blog</p>
      </div>
    </Container>
  );
};

export default MenuPost;
