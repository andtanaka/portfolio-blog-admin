import styles from './PreviewPostPage.module.scss';
import ScrollSpy from 'react-ui-scrollspy';

import {
  Button,
  Col,
  Container,
  Form,
  InputGroup,
  Nav,
  NavLink,
  Row,
} from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import { useGetPostByIdQuery } from '../store/index.js';
import Loader from '../components/Loader.jsx';
import { useParams } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import PreviewPost from '../components/PreviewPost.jsx';
import MenuPost from '../components/posts/MenuPost.jsx';

const PreviewPostPage = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useGetPostByIdQuery(id);

  let content;

  if (isLoading) {
    content = <Loader />;
  } else if (error) {
    toast.error('Erro ao carregar post');
    content = <p>Erro</p>;
  } else {
    content = (
      <>
        <Row>
          <MenuPost postName={data.post} />
        </Row>
        <Row className="mt-3">
          <Col xs={{ span: 12, order: 2 }} md={{ span: 8, order: 1 }}>
            <ScrollSpy
              scrollThrottle={100}
              useBoxMethod={false}
              activeClass="active-scrollspy"
              className={styles.scrollspyContainer}
            >
              <PreviewPost post={data.post} />
            </ScrollSpy>
          </Col>
          <Col xs={{ span: 12, order: 1 }} md={{ span: 4, order: 2 }}>
            <div className={styles.fixContainer}>
              <Form className={styles.formSearch}>
                <InputGroup className="mb-3">
                  <Form.Control aria-label="Text input" />
                  <Button variant="outline-secondary">
                    <FaSearch />
                  </Button>
                </InputGroup>
              </Form>
              <div className="d-md-block d-none">
                <ul className={styles.subtopicsList}>
                  {data.post.subtopics.map((topic) => (
                    <Nav.Item as="li" key={topic.htmlId}>
                      <NavLink
                        as="a"
                        href={`#${topic.htmlId}`}
                        data-to-scrollspy-id={topic.htmlId}
                      >
                        {topic.name}
                      </NavLink>
                    </Nav.Item>
                  ))}
                </ul>
              </div>
            </div>
          </Col>
        </Row>
      </>
    );
  }

  return (
    <Container>
      {content}
      <ToastContainer />
    </Container>
  );
};

export default PreviewPostPage;
