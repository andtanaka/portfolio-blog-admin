import './App.scss';
import 'react-toastify/dist/ReactToastify.css';

import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RootApp from './components/RootApp';
import RootLayout from './components/RootLayout';
import AppPage from './pages/AppPage';
import ShowUserPage from './pages/ShowUserPage';
import DraftsPostsPage from './pages/DraftsPostsPage';
import ShowDraftPostPage from './pages/ShowDraftPostPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'login', element: <LoginPage /> },
    ],
  },
  {
    path: 'admin',
    element: <RootApp />,
    children: [
      { index: true, element: <AppPage /> },
      { path: 'user', element: <ShowUserPage /> },
      { path: 'posts/draft', element: <DraftsPostsPage /> },
      { path: 'posts/draft/page/:pageNumber', element: <DraftsPostsPage /> },
      { path: 'posts/draft/:name', element: <ShowDraftPostPage /> },
      // { path: 'posts', element: <PostsPage /> },
      // { path: 'posts/page/:pageNumber', element: <PostsPage /> },
      // { path: 'post/:name', element: <ShowPostPage /> },

      // { path: 'tags', element: <ListTagsPage /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
