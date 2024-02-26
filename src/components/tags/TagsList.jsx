import styles from './TagsList.module.scss';
import { useQuery } from '../../hooks/useQuery';
import { Container } from 'react-bootstrap';
import Loader from '../Loader';
import { useGetTagsQuery } from '../../store';
import TagsListItem from './TagsListItem';

const TagsList = () => {
  const query = useQuery();
  const name = query.get('name') || '';
  const sort = query.get('sort') || '';
  let content = <></>;

  const { data, error, isLoading } = useGetTagsQuery({
    name,
    sort,
  });

  if (isLoading) {
    content = <Loader />;
  } else if (error) {
    console.log(error.data.message);
    content = <div>Erro ao carregar as tags.</div>;
  } else {
    if (data.tags.length === 0) {
      content = (
        <Container>
          <p className="pt-3">Nenhuma tag cadastrada</p>
        </Container>
      );
    } else {
      content = (
        <>
          <Container>
            <h3>Tags</h3>
            <ul className={styles.list}>
              {data.tags.map((tag) => (
                <TagsListItem key={tag._id} tag={tag} />
              ))}
            </ul>
          </Container>
        </>
      );
    }
  }

  return <>{content}</>;
};

export default TagsList;
