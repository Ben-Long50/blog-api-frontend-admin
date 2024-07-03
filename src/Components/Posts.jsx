import { useState, useEffect } from 'react';
import '../styles/form.css';
import '../styles/post.css';
import { Outlet, useNavigate } from 'react-router-dom';

const Posts = () => {
  const [posts, setPosts] = useState(() => {
    const storedPosts = localStorage.getItem('posts');
    const parsedPosts = JSON.parse(storedPosts);
    return Array.isArray(parsedPosts) ? parsedPosts : [];
  });
  const [mythosCategories, setMythosCategories] = useState([]);
  const [errors, setErrors] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:3000/posts', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          navigate('/login');
          console.log(response);
          throw new Error('Forbidden');
        }
        const data = await response.json();
        setPosts(data);
        localStorage.setItem('posts', JSON.stringify(data));
        const categories = data.map((post) => {
          return post.mythos;
        });
        const uniqueCategories = categories.reduce(
          (accumulator, currentValue) => {
            if (!accumulator.includes(currentValue)) {
              accumulator.push(currentValue);
            }
            return accumulator;
          },
          [],
        );
        setMythosCategories(uniqueCategories);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="layout">
      <Outlet
        context={[posts, setPosts, errors, setErrors, mythosCategories]}
      />
    </div>
  );
};

export default Posts;
