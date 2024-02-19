import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL, USER_URL } from '../../constants';

const usersApi = createApi({
  reducerPath: 'users',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  endpoints(builder) {
    return {
      login: builder.mutation({
        query: (data) => ({
          url: `${USER_URL}/login`,
          method: 'POST',
          body: data,
        }),
      }),
      register: builder.mutation({
        invalidatesTags: ['User'],

        query: (data) => ({
          url: `${USER_URL}`,
          method: 'POST',
          body: data,
        }),
      }),
      logout: builder.mutation({
        //logout no backend
        query: () => ({
          url: `${USER_URL}/logout`,
          method: 'POST',
        }),
      }),
      getProfile: builder.query({
        providesTags: ['User'],
        query: () => ({
          url: `${USER_URL}/profile`,
          method: 'GET',
        }),
      }),
      updateProfile: builder.mutation({
        invalidatesTags: ['User'],
        query: (data) => ({
          url: `${USER_URL}/profile`,
          method: 'PUT',
          body: data,
        }),
      }),
      updateUserPassword: builder.mutation({
        invalidatesTags: ['User'],
        query: (data) => ({
          url: `${USER_URL}/profile/password`,
          method: 'PUT',
          body: data,
        }),
      }),
      deleteProfile: builder.mutation({
        invalidatesTags: ['User'],
        query: () => ({
          url: `${USER_URL}/profile`,
          method: 'DELETE',
        }),
      }),
      getUsers: builder.query({
        providesTags: (result, error, arg) => {
          const tags = [];
          if (result) {
            result.users.map((user) => {
              return tags.push({ type: 'User', id: user._id });
            });
          }
          tags.push('User');
          return tags;
        },
        query: () => ({
          url: USER_URL,
          method: 'GET',
        }),
      }),
      deleteUser: builder.mutation({
        invalidatesTags: (results, error, userId) => {
          return [{ type: 'User', id: userId }];
        },
        query: (userId) => ({
          url: `${USER_URL}/${userId}`,
          method: 'DELETE',
        }),
      }),
      getUserDetails: builder.query({
        providesTags: (result, error, userId) => {
          return [{ type: 'User', id: userId }];
        },
        query: (userId) => ({
          url: `${USER_URL}/${userId}`,
          method: 'GET',
        }),
        keepUnusedDataFor: 5,
      }),
      updateUser: builder.mutation({
        invalidatesTags: (results, error, data) => {
          return [{ type: 'User', id: data._id }];
        },
        query: (data) => ({
          url: `${USER_URL}/${data._id}`,
          method: 'PUT',
          body: data,
        }),
      }),
    };
  },
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useGetProfileQuery,
  useUpdateProfileMutation,
  useUpdateUserPasswordMutation,
  useDeleteProfileMutation,
  useGetUsersQuery,
  useDeleteUserMutation,
  useGetUserDetailsQuery,
  useUpdateUserMutation,
} = usersApi;
export { usersApi };
