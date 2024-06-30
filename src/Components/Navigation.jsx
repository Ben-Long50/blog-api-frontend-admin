import { Link } from 'react-router-dom';
import Logo from './Logo';
import '../styles/navigation.css';

const Navigation = () => {
  return (
    <nav className="navbar">
      <Logo />
      <ul className="link-list">
        <li>
          <Link to="manage-posts">Manage Posts</Link>
        </li>
        <li>
          <Link to="create-post">Create Post</Link>
        </li>
      </ul>
      <button>
        <Link to="/login">Log In</Link>
      </button>
    </nav>
  );
};

export default Navigation;
