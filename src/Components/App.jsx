import Navigation from './Navigation';
import { Outlet } from 'react-router-dom';
import '../styles/main.css';
import '../styles/reset-css.css';

const App = () => {
  return (
    <>
      <Navigation />
      <Outlet />
    </>
  );
};

export default App;
