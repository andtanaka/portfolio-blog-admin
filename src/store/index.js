import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import authSliceReducer from './slices/authSlice.js';

import { setupListeners } from '@reduxjs/toolkit/query';
import { usersApi } from './apis/userApi.js';
import { postsApi } from './apis/postsApi.js';
import { draftsPostsApi } from './apis/draftsPostsApi.js';
import { tagsApi } from './apis/tagsApi.js';
import tagSliceReducer from './slices/tagSlice.js';

export const store = configureStore({
  reducer: {
    [usersApi.reducerPath]: usersApi.reducer,
    [postsApi.reducerPath]: postsApi.reducer,
    [draftsPostsApi.reducerPath]: draftsPostsApi.reducer,
    [tagsApi.reducerPath]: tagsApi.reducer,
    tag: tagSliceReducer,
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
} from './apis/userApi.js';

export {
  useGetPostsQuery,
  useGetSomePostsQuery,
  useGetPostByIdQuery,
  useAddPostMutation,
  useUpdatePostMutation,
  useRemovePostMutation,
} from './apis/postsApi.js';

export {
  useGetDraftsPostsQuery,
  useGetDraftPostByIdQuery,
  useGetDraftPostByNameQuery,
  useAddDraftPostMutation,
  useUpdateDraftPostMutation,
  useRemoveDraftPostMutation,
} from './apis/draftsPostsApi.js';

export {
  useGetTagsQuery,
  useGetTagByIdQuery,
  useAddTagMutation,
  useUpdateTagMutation,
  useRemoveTagMutation,
} from './apis/tagsApi.js';
