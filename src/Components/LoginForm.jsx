import { Link, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import '../styles/form.css';
import Form from './Form';
import InputField from './InputField';
import { AuthContext } from './AuthContext';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [errors, setErrors] = useState([]);
  const { login, apiUrl } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${apiUrl}/admin/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      if (response.ok) {
        console.log('Response:', result.token);
        localStorage.setItem('token', result.token);
        login();
        navigate('/manage-posts');
      } else {
        const errorArray = result.map((error) => {
          return error.msg;
        });
        setErrors(errorArray);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="layout">
      <div className="form-layout">
        <Form method="post" onSubmit={handleSubmit} buttonText="Log In">
          <h1 className="form-title">Log In</h1>
          <InputField
            label="Username"
            name="username"
            type="text"
            onChange={handleChange}
          />
          <InputField
            label="Password"
            name="password"
            type="password"
            onChange={handleChange}
          />
        </Form>
        <p>
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
        {errors.length > 0 && (
          <div className="error-list">
            <span style={{ color: 'black' }}>Errors</span>
            {errors.map((error, index) => (
              <p key={index}>{error}</p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginForm;
