import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef, useContext } from 'react';
import Form from './Form';
import InputField from './InputField';
import { AuthContext } from './AuthContext';
import { jwtDecode } from 'jwt-decode';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import '../styles/form.css';
import '../styles/customQuill.css';

const PostForm = () => {
  const [title, setTitle] = useState('');
  const [mythos, setMythos] = useState('');
  const [author, setAuthor] = useState('');
  const [body, setBody] = useState('');
  const [image, setImage] = useState(undefined);
  const [mythosCategories, setMythosCategories] = useState([]);
  const { apiUrl } = useContext(AuthContext);

  const hiddenInputRef = useRef(null);
  const selectRef = useRef('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const decodedUser = jwtDecode(token);
        setAuthor(decodedUser.user._id);

        const response = await fetch(`${apiUrl}/posts`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Forbidden');
        }
        const data = await response.json();
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

  const handleInput = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'title':
        setTitle(value);
        break;
      case 'mythos':
        setMythos(value);
        if (document.activeElement === selectRef.current) {
          selectRef.current.value = value;
        }
        break;
    }
  };

  const handleBody = (value) => {
    setBody(value);
    if (hiddenInputRef.current) {
      hiddenInputRef.current.value = value;
    }
  };

  const handleUpload = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('mythos', mythos);
    formData.append('author', author);
    formData.append('body', body);
    formData.append('image', image);

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${apiUrl}/posts`, {
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
    <div className="layout">
      <div className="form-layout">
        <h1 className="header">Create Post</h1>
        <Form
          method="post"
          class="post-form"
          onSubmit={handleSubmit}
          buttonText="Create Draft"
        >
          <InputField
            label="Title"
            name="title"
            type="text"
            onChange={handleInput}
          />
          <label htmlFor="mythos">Mythos</label>
          <select
            name="mythos"
            id="mythos"
            ref={selectRef}
            onChange={handleInput}
            defaultValue={mythos}
          >
            <option value="" disabled>
              Select or create a mythos
            </option>
            {mythosCategories.map((category, index) => {
              return (
                <option key={index} value={category}>
                  {category}
                </option>
              );
            })}
            <option value="Create new mythos">Create new mythos</option>
          </select>
          {selectRef.current.value === 'Create new mythos' && (
            <>
              <InputField
                label="Enter new mythos category"
                name="mythos"
                type="text"
                onChange={handleInput}
              />
            </>
          )}
          <InputField
            label="Image"
            name="image"
            type="file"
            onChange={handleUpload}
          />
          <label htmlFor="body">Content</label>
          <ReactQuill theme="snow" value={body} onChange={handleBody} />
          <input
            id="body"
            type="hidden"
            name="body"
            ref={hiddenInputRef}
            value={body}
          />
        </Form>
      </div>
    </div>
  );
};

export default PostForm;
