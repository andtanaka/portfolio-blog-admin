import React from 'react';
import { useQuery } from '../../hooks/useQuery';
import { useParams } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Pagination from '../Pagination';
import CardsDraftsPosts from './CardsDraftsPosts';
import Loader from '../Loader';
import { useGetDraftsPostsQuery } from '../../store';

const DraftsPostsList = () => {
  const query = useQuery();
  const { pageNumber } = useParams() || 1;
  const text = query.get('text') || '';
  const sort = query.get('sort') || '';
  let content = <></>;

  const { data, error, isLoading } = useGetDraftsPostsQuery({
    text,
    sort,
    pageNumber,
  });

  if (isLoading) {
    content = <Loader />;
  } else if (error) {
    console.log(error.data.message);
    content = <div>Erro ao carregar os rascunhos.</div>;
  } else {
    if (data.draftPosts.length === 0) {
      content = (
        <Container>
          <p className="pt-3">Nenhum rascunho cadastrado</p>
        </Container>
      );
    } else {
      content = (
        <>
          <CardsDraftsPosts draftPosts={data.draftPosts} />
          <Pagination
            pages={data.pages}
            page={data.page}
            url="/admin/posts/draft"
          />
        </>
      );
    }
  }

  return <>{content}</>;
};

export default DraftsPostsList;
