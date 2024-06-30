import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Form from './Form';
import InputField from './InputField';
import { jwtDecode } from 'jwt-decode';
import '../styles/form.css';

const PostForm = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [body, setBody] = useState('');
  const [image, setImage] = useState(undefined);
  //   const [errors, setErrors] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const decodedUser = jwtDecode(token);
    setAuthor(decodedUser.user._id);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'title':
        setTitle(value);
        break;
      case 'body':
        setBody(value);
        break;
    }
  };

  const handleUpload = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('author', author);
    formData.append('body', body);
    formData.append('image', image);

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3000/posts', {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();
      if (response.ok) {
        console.log('Draft Submitted:', result);
        navigate('/manage-posts');
      } else {
        console.error(result);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="form-layout">
      <Form method="post" onSubmit={handleSubmit} buttonText="Create Draft">
        <h1 className="form-title">Create Post</h1>
        <InputField
          label="Title"
          name="title"
          type="text"
          onChange={handleChange}
        />
        <InputField
          label="Image"
          name="image"
          type="file"
          onChange={handleUpload}
        />
        <InputField
          label="Content"
          name="body"
          type="text"
          onChange={handleChange}
        />
      </Form>
    </div>
  );
};

export default PostForm;
