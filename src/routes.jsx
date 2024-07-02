import App from './Components/App';
import ErrorPage from './Components/ErrorPage';
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import LoginForm from './Components/LoginForm.jsx';
import SignupForm from './Components/SignupForm.jsx';
import Posts from './Components/Posts.jsx';
import PostForm from './Components/PostForm.jsx';
import PostDetail from './Components/PostDetail.jsx';
import PostList from './Components/PostList.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />} errorElement={<ErrorPage />}>
      <Route path="login" element={<LoginForm />} />
      <Route path="signup" element={<SignupForm />} />
      <Route path="manage-posts" element={<Posts />}>
        <Route index element={<PostList />} />
        <Route path=":postId" element={<PostDetail />} />
      </Route>
      <Route path="create-post" element={<PostForm />} />
    </Route>,
  ),
);

export default router;
