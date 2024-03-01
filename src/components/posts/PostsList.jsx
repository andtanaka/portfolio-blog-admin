import React from 'react';
import { useParams } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { useQuery } from '../../hooks/useQuery';
import { useGetAllPostsQuery } from '../../store';
import Pagination from '../Pagination';
import CardsPosts from './CardsPosts';

const PostsList = () => {
  const query = useQuery();
  const { pageNumber } = useParams() || 1;
  const text = query.get('text') || '';
  const sort = query.get('sort') || '';
  let content = <></>;

  const { data, error, isLoading } = useGetAllPostsQuery({
    text,
    sort,
    pageNumber,
  });

  if (isLoading) {
    content = <div>... Loading</div>;
  } else if (error) {
    console.log(error.data.message);
    content = <div>Erro ao ler posts.</div>;
  } else {
    if (data.posts.length === 0) {
      content = (
        <Container>
          <p className="pt-3">Nenhum post cadastrado</p>
        </Container>
      );
    } else {
      content = (
        <>
          <CardsPosts posts={data.posts} />
          <Pagination pages={data.pages} page={data.page} url="/admin/posts" />
        </>
      );
    }
  }
  return <>{content}</>;
};

export default PostsList;
