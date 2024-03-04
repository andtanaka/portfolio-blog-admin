import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL, DRAFT_POST_URL } from '../../constants.js';

const draftsPostsApi = createApi({
  reducerPath: 'draftsPosts',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  endpoints(builder) {
    return {
      getDraftsPosts: builder.query({
        providesTags: (result, error, arg) => {
          const tags = [];
          if (result) {
            result.draftPosts.map((draftpost) => {
              return tags.push({ type: 'DraftsPosts', id: draftpost._id });
            });
          }
          tags.push('DraftsPosts');
          return tags;
        },
        query: ({ text, sort, pageNumber }) => ({
          url: DRAFT_POST_URL,
          method: 'GET',
          credentials: 'include',
          params: {
            text,
            sort,
            pageNumber,
          },
        }),
      }),
      getDraftPostById: builder.query({
        providesTags: (result, error, id) => {
          // return ['DraftsPosts'];
          return [{ type: 'DraftsPosts', id }];
        },
        query: (id) => {
          return {
            url: `${DRAFT_POST_URL}/${id}`,
            method: 'GET',
            credentials: 'include',
          };
        },
      }),
      addDraftPost: builder.mutation({
        invalidatesTags: ['DraftsPosts'],
        query: (data) => {
          return {
            url: `${DRAFT_POST_URL}`,
            method: 'POST',
            credentials: 'include',
            body: data,
          };
        },
      }),
      addDraftPostFromPost: builder.mutation({
        invalidatesTags: ['DraftsPosts'],
        query: ({ postId, name, title }) => {
          return {
            url: `${DRAFT_POST_URL}/${postId}`,
            method: 'POST',
            credentials: 'include',
            body: { name, title },
          };
        },
      }),
      updateDraftPost: builder.mutation({
        invalidatesTags: (results, error, data) => {
          return [{ type: 'DraftsPosts', id: data._id }];
        },
        query: (data) => {
          return {
            url: `${DRAFT_POST_URL}/${data._id}`,
            method: 'PUT',
            credentials: 'include',
            body: data,
          };
        },
      }),
      removeDraftPost: builder.mutation({
        invalidatesTags: (results, error, id) => {
          return [{ type: 'DraftsPosts', id: id }];
        },
        query: (id) => {
          return {
            url: `${DRAFT_POST_URL}/${id}`,
            method: 'DELETE',
            credentials: 'include',
          };
        },
      }),
    };
  },
});

export const {
  useGetDraftsPostsQuery,
  useGetDraftPostByIdQuery,
  useAddDraftPostMutation,
  useAddDraftPostFromPostMutation,
  useUpdateDraftPostMutation,
  useRemoveDraftPostMutation,
} = draftsPostsApi;
export { draftsPostsApi };
