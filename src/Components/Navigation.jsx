import { Link } from 'react-router-dom';
import Logo from './Logo';
import Button from './Button';
import List from './List';
import '../styles/navigation.css';

const Navigation = () => {
  return (
    <nav className="navbar">
      <Logo />
      <List>
        <Link className="link" to="manage-posts">
          <Button text="Manage Posts" />
        </Link>
        <Link className="link" to="create-post">
          <Button text="Create Post" />
        </Link>
        <Link className="link" to="/login">
          <Button text="Log In" />
        </Link>
      </List>
    </nav>
  );
};

export default Navigation;
