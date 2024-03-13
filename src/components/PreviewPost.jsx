import styles from './PreviewPost.module.scss';
import { marked } from 'marked'; //markdown to html
import parse from 'html-react-parser'; //html to jsx
import { Link } from 'react-router-dom';

import { Container } from 'react-bootstrap';
import printDate from '../utils/printDate';
import { FaTags } from 'react-icons/fa';

const PreviewPost = ({ post }) => {
  const content = post.htmlBody
    ? /<body.*?>([\s\S]*)<\/body>/.exec(post.htmlBody)[1]
    : '';

  return (
    <div>
      <Container className="p-0">
        {post.postDate ? (
          <p className={styles.postDate}>{printDate(post.postDate)}</p>
        ) : (
          '00 · Mês · 0000'
        )}

        <h3 className="mb-0">{post.title}</h3>
        <p className="mb-1">{post.subtitle}</p>
        <ul className={styles.tagsList}>
          <li className={styles.tagCell}>
            <FaTags />
          </li>
          {post.tags.map((tag) => (
            <li key={tag._id} className={styles.tagCell}>
              <Link to={`/posts/?tag=${tag.name}`} className={styles.tagIcon}>
                #{tag.name}
              </Link>
            </li>
          ))}
        </ul>
        <div className="pt-3 render-content">{parse(content)}</div>
      </Container>
    </div>
  );
};

export default PreviewPost;
