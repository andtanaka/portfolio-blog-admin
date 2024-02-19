// import React from 'react';
// import { useQuery } from '../../hooks/useQuery';
// import { useParams } from 'react-router-dom';
// import { useGetPostsQuery } from '../../../store';
// import TablePosts from './TablePosts';
// import Pagination from '../../Pagination';
// import { Container } from 'react-bootstrap';

// const PostsList = () => {
//   const query = useQuery();
//   const { pageNumber } = useParams() || 1;
//   const name = query.get('name') || '';
//   const sector = query.get('sector') || '';
//   const sort = query.get('sort') || '';
//   let content = <></>;

//   const { data, error, isLoading } = useGetPostsQuery({
//     name,
//     sector,
//     sort,
//     pageNumber,
//   });

//   if (isLoading) {
//     content = <div>... Loading</div>;
//   } else if (error) {
//     console.log(error.data.message);
//     content = <div>Error loading products.</div>;
//   } else {
//     if (data.products.length === 0) {
//       content = (
//         <Container>
//           <p className="pt-3">Nenhum produto cadastrado</p>
//         </Container>
//       );
//     } else {
//       content = (
//         <>
//           <TablePosts products={data.products} />
//           <Pagination pages={data.pages} page={data.page} url="/app/produtos" />
//         </>
//       );
//     }
//   }

//   return <>{content}</>;
// };

// export default PostsList;
