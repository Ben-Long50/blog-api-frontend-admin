import { useState, useEffect } from 'react';
import '../styles/form.css';
import '../styles/post.css';
import { Outlet } from 'react-router-dom';

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [mythosCategories, setMythosCategories] = useState([]);

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
          console.log(response);
          throw new Error('Forbidden');
        }
        const data = await response.json();
        setPosts(data);
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
      <Outlet context={[posts, setPosts, mythosCategories]} />
    </div>
  );
};

export default Posts;
