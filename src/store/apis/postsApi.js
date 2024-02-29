import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL, POST_URL } from '../../constants.js';

const postsApi = createApi({
  reducerPath: 'posts',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  endpoints(builder) {
    return {
      getPosts: builder.query({
        providesTags: (result, error, arg) => {
          const tags = [];
          if (result) {
            result.posts.map((post) => {
              return tags.push({ type: 'Posts', id: post._id });
            });
          }
          tags.push('Posts');
          return tags;
        },
        query: ({ text, sort, pageNumber }) => ({
          url: POST_URL,
          method: 'GET',
          credentials: 'include',
          params: {
            text,
            sort,
            pageNumber,
          },
        }),
      }),
      getSomePosts: builder.query({
        providesTags: (result, error, arg) => {
          const tags = [];
          if (result) {
            result.posts.map((post) => {
              return tags.push({ type: 'Posts', id: post._id });
            });
          }
          tags.push('Posts');
          return tags;
        },
        query: () => ({
          url: `${POST_URL}/some`,
          method: 'GET',
        }),
      }),
      getPostById: builder.query({
        providesTags: (result, error, id) => {
          return [{ type: 'Posts', id: id }];
        },
        query: (id) => {
          return {
            url: `${POST_URL}/${id}`,
            method: 'GET',
            credentials: 'include',
          };
        },
      }),
      addPost: builder.mutation({
        invalidatesTags: ['Posts'],
        query: (id) => {
          //draft post's id
          return {
            url: `${POST_URL}`,
            method: 'POST',
            credentials: 'include',
            body: { id },
          };
        },
      }),
      updatePost: builder.mutation({
        invalidatesTags: (results, error, data) => {
          return [{ type: 'Posts', id: data.id }];
        },
        query: (data) => {
          return {
            url: `${POST_URL}/${data.id}`,
            method: 'PUT',
            credentials: 'include',
            body: data,
          };
        },
      }),
      removePost: builder.mutation({
        invalidatesTags: (results, error, id) => {
          return [{ type: 'Posts', id: id }];
        },
        query: (id) => {
          return {
            url: `${POST_URL}/${id}`,
            method: 'DELETE',
            credentials: 'include',
          };
        },
      }),
    };
  },
});

export const {
  useGetPostsQuery,
  useGetSomePostsQuery,
  useGetPostByIdQuery,
  useAddPostMutation,
  useUpdatePostMutation,
  useRemovePostMutation,
} = postsApi;
export { postsApi };
