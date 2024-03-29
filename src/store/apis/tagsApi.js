import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL, TAG_URL } from '../../constants.js';

const tagsApi = createApi({
  reducerPath: 'tags',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  endpoints(builder) {
    return {
      getTags: builder.query({
        providesTags: (result, error, arg) => {
          const tags = [];
          if (result) {
            result.tags.map((tag) => {
              return tags.push({ type: 'Tags', id: tag._id });
            });
          }
          tags.push('Tags');
          return tags;
        },
        query: ({ name, sort }) => ({
          url: TAG_URL,
          method: 'GET',
          credentials: 'include',
          params: {
            name,
            sort,
          },
        }),
      }),
      getTagById: builder.query({
        providesTags: (result, error, id) => {
          return [{ type: 'Tags', id: id }, 'Tags'];
        },
        query: (id) => {
          return {
            url: `${TAG_URL}/${id}`,
            method: 'GET',
            credentials: 'include',
          };
        },
      }),
      addTag: builder.mutation({
        invalidatesTags: ['Tags'],
        query: (data) => {
          return {
            url: `${TAG_URL}`,
            method: 'POST',
            credentials: 'include',
            body: data,
          };
        },
      }),
      updateTag: builder.mutation({
        invalidatesTags: (results, error, data) => {
          return [{ type: 'Tags', id: data._id }];
        },
        query: (data) => {
          return {
            url: `${TAG_URL}/${data._id}`,
            method: 'PUT',
            credentials: 'include',
            body: data,
          };
        },
      }),
      removeTag: builder.mutation({
        invalidatesTags: (results, error, id) => {
          return [{ type: 'Tags', id: id }];
        },
        query: (id) => {
          return {
            url: `${TAG_URL}/${id}`,
            method: 'DELETE',
            credentials: 'include',
          };
        },
      }),
    };
  },
});

export const {
  useGetTagsQuery,
  useGetTagByIdQuery,
  useAddTagMutation,
  useUpdateTagMutation,
  useRemoveTagMutation,
} = tagsApi;
export { tagsApi };
