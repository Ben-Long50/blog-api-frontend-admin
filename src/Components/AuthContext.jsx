import { createContext, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedUser = jwtDecode(token);
      const adminPermission = decodedUser.user.admin;
      return adminPermission ? true : false;
    } else {
      return false;
    }
  });

  const apiUrl = 'https://legends-of-the-hearth.adaptable.app';

  const login = () => {
    const token = localStorage.getItem('token');
    const decodedUser = jwtDecode(token);
    const adminPermission = decodedUser.user.admin;
    adminPermission && setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, apiUrl }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
