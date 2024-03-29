import './App.scss';
import './styles/render.scss';
import 'react-toastify/dist/ReactToastify.css';

import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import LoginPage from './pages/LoginPage.jsx';
import RootApp from './components/RootApp.jsx';
import RootLayout from './components/RootLayout.jsx';
import AppPage from './pages/AppPage.jsx';
import ShowUserPage from './pages/ShowUserPage.jsx';
import DraftsPostsPage from './pages/DraftsPostsPage.jsx';
import ShowDraftPostPage from './pages/ShowDraftPostPage.jsx';
import PreviewDraftPostPage from './pages/PreviewDraftPostPage.jsx';
import TagsPage from './pages/TagsPage.jsx';
import PostsPage from './pages/PostsPage.jsx';
import ShowPostPage from './pages/ShowPostPage.jsx';
import PreviewPostPage from './pages/PreviewPostPage.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <LoginPage /> },
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
      { path: 'posts/draft/:id', element: <ShowDraftPostPage /> },
      { path: 'posts/draft/:id/preview', element: <PreviewDraftPostPage /> },

      { path: 'posts', element: <PostsPage /> },
      { path: 'posts/page/:pageNumber', element: <PostsPage /> },
      { path: 'posts/:id', element: <ShowPostPage /> },
      { path: 'posts/:id/preview', element: <PreviewPostPage /> },

      { path: 'tags', element: <TagsPage /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
