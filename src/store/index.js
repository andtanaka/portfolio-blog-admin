import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import authSliceReducer from './slices/authSlice';

import { setupListeners } from '@reduxjs/toolkit/query';
import { usersApi } from './apis/userApi';
import { postsApi } from './apis/postsApi';
import { draftsPostsApi } from './apis/draftsPostsApi';
import { tagsApi } from './apis/tagsApi';

export const store = configureStore({
  reducer: {
    [usersApi.reducerPath]: usersApi.reducer,
    [postsApi.reducerPath]: postsApi.reducer,
    [draftsPostsApi.reducerPath]: draftsPostsApi.reducer,
    [tagsApi.reducerPath]: tagsApi.reducer,

    auth: authSliceReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .concat(usersApi.middleware)
      .concat(postsApi.middleware)
      .concat(draftsPostsApi.middleware)
      .concat(tagsApi.middleware);
  },
});

setupListeners(store.dispatch);

export {
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
} from './apis/userApi';

export {
  useGetPostsQuery,
  useGetSomePostsQuery,
  useGetPostByIdQuery,
  useAddPostMutation,
  useUpdatePostMutation,
  useRemovePostMutation,
} from './apis/postsApi';

export {
  useGetDraftsPostsQuery,
  useGetDraftPostByIdQuery,
  useGetDraftPostByNameQuery,
  useAddDraftPostMutation,
  useUpdateDraftPostMutation,
  useRemoveDraftPostMutation,
} from './apis/draftsPostsApi';

export {
  useGetTagsQuery,
  useGetTagByIdQuery,
  useAddTagMutation,
  useUpdateTagMutation,
  useRemoveTagMutation,
} from './apis/tagsApi';
