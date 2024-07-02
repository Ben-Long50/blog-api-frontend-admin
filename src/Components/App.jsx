import Navigation from './Navigation';
import { Outlet } from 'react-router-dom';
import '../styles/main.css';

const App = () => {
  return (
    <>
      <Navigation />
      <Outlet />
    </>
  );
};

export default App;
