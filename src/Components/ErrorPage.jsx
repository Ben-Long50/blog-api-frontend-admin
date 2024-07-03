import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <div className="layout">
      <h1>You don't have the permissions to view this page</h1>
      <h2>(Or this page doesn't exist)</h2>
      <Link to="/login">Please login to proceed</Link>
    </div>
  );
};

export default ErrorPage;
