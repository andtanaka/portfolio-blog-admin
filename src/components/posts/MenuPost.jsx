import styles from './MenuPost.module.scss';
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaEdit, FaFileUpload } from 'react-icons/fa';
import { GrOverview } from 'react-icons/gr';
import { useUpdatePostMutation } from '../../store';
import { toast } from 'react-toastify';

const MenuPost = ({ post }) => {
  const navigate = useNavigate();
  const [updatePost, { isLoading }] = useUpdatePostMutation();

  const handlePublish = async () => {
    try {
      await updatePost({ ...post, stop: false }).unwrap();
      toast.success('Post publicado com sucesso');
    } catch (err) {
      console.log(err);
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <Container className={styles.menuContainer}>
      <div
        className={styles.buttonIcon}
        onClick={() => {
          console.log('redirecionar para a página de edição');
          navigate(`/admin/posts/${post._id}`);
        }}
      >
        <div className={styles.icon}>
          <FaEdit />
        </div>
        <p className={styles.textIcon}>Editar</p>
      </div>
      {post.stop ? (
        <div className={styles.buttonIcon} onClick={handlePublish}>
          <div className={styles.icon}>
            <FaFileUpload />
          </div>
          <p className={styles.textIcon}>Publicar</p>
        </div>
      ) : (
        <div
          className={styles.buttonIcon}
          onClick={() =>
            console.log(
              'Navega para a página do blog, usar name de post como parâmetro'
            )
          }
        >
          <div className={styles.icon}>
            <GrOverview />
          </div>
          <p className={styles.textIcon}>Ver blog</p>
        </div>
      )}
    </Container>
  );
};

export default MenuPost;
