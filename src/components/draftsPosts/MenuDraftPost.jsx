import styles from './MenuDraftPost.module.scss';
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaEdit, FaFileUpload } from 'react-icons/fa';
import { useAddPostMutation } from '../../store';
import { toast } from 'react-toastify';

const MenuDraftPost = ({ postId }) => {
  const navigate = useNavigate();
  const [createPost] = useAddPostMutation();

  const handlePublish = async () => {
    const res = await createPost(postId).unwrap();
    toast.success('Rascunho postado com sucesso');
    navigate(`/admin/posts`, { replace: true });
    navigate(0); //dá um refresh para dar um novo get em draftposts
    console.log(res);
  };

  return (
    <Container className={styles.menuContainer}>
      <div
        className={styles.buttonIcon}
        onClick={() => navigate(`/admin/posts/draft/${postId}`)}
      >
        <div className={styles.icon}>
          <FaEdit />
        </div>
        <p className={styles.textIcon}>Editar</p>
      </div>
      <div className={styles.buttonIcon} onClick={handlePublish}>
        <div className={styles.icon}>
          <FaFileUpload />
        </div>
        <p className={styles.textIcon}>Publicar</p>
      </div>
    </Container>
  );
};

export default MenuDraftPost;
