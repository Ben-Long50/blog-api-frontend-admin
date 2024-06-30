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

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />} errorElement={<ErrorPage />}>
      {/* <Route index element={<Homepage />} /> */}
      <Route path="login" element={<LoginForm />} />
      <Route path="signup" element={<SignupForm />} />
      <Route path="manage-posts" element={<Posts />} />
      <Route path="create-post" element={<PostForm />} />
      {/* <Route path="greek" element={<Posts />} />
      <Route path="japanese" element={<Posts />} />
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} /> */}
    </Route>,
  ),
);

export default router;
