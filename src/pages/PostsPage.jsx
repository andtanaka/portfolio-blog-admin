import styles from './PostsPage.module.scss';
import { Container } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';
import { PostsList, SearchPost } from '../components/posts';

const PostsPage = () => {
  return (
    <Container fluid>
      <Container>
        <SearchPost url="/admin/posts" />
      </Container>
      <div className="m-auto">
        <PostsList />
      </div>
      <ToastContainer />
    </Container>
  );
};

export default PostsPage;
