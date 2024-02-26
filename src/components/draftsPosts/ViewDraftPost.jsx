import styles from './ViewDraftPost.module.scss';
import { marked } from 'marked'; //markdown to html
import parse from 'html-react-parser'; //html to jsx
import { Col, Container, Row } from 'react-bootstrap';

const ViewDraftPost = ({ post }) => {
  return (
    <>
      <h5 className="text-center">Pré-visualização da página</h5>
      <Container fluid className={styles.renderContainer}>
        <div className="render-content">{parse(marked.parse(post.body))}</div>
      </Container>
    </>
  );
};

export default ViewDraftPost;
