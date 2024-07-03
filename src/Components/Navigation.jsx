import { Link, useNavigate } from 'react-router-dom';
import Logo from './Logo';
import Button from './Button';
import List from './List';
import '../styles/navigation.css';
import { useContext } from 'react';
import { AuthContext } from './AuthContext';

const Navigation = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    if (isAuthenticated) {
      localStorage.clear();
      logout();
      navigate('/login');
    }
  };

  return (
    <nav className="navbar">
      <Logo />
      <List>
        <Button>
          <Link
            className="link"
            to={isAuthenticated ? '/manage-posts' : '/login'}
          >
            Manage Posts
          </Link>
        </Button>
        <Button>
          <Link
            className="link"
            to={isAuthenticated ? '/create-post' : '/login'}
          >
            Create Post
          </Link>
        </Button>
        <Button onClick={handleLogout}>
          <Link className="link" to="/login">
            {isAuthenticated ? 'Logout' : 'Login'}
          </Link>
        </Button>
      </List>
    </nav>
  );
};

export default Navigation;
