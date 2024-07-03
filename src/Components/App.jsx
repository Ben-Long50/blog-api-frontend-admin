import Navigation from './Navigation';
import AuthProvider from './AuthContext';
import { Outlet } from 'react-router-dom';
import '../styles/main.css';

const App = () => {
  return (
    <AuthProvider>
      <Navigation />
      <Outlet />
    </AuthProvider>
  );
};

export default App;
