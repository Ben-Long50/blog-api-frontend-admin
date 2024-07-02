import { useLocation, useNavigate, useOutletContext } from 'react-router-dom';
import { useEffect, useState, useRef, useParams } from 'react';
import Form from './Form';
import InputField from './InputField';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import '../styles/form.css';
import '../styles/customQuill.css';

const EditPostForm = () => {
  const location = useLocation();
  const { postId } = location.state;
  const [title, setTitle] = useState('');
  const [mythos, setMythos] = useState('');
  const [body, setBody] = useState('');
  const [image, setImage] = useState(undefined);
  const [posts, setPosts, mythosCategories] = useOutletContext();

  const hiddenInputRef = useRef(null);
  const selectRef = useRef('');
  const navigate = useNavigate();

  useEffect(() => {
    const post = posts.find((post) => {
      if (post._id === postId) {
        return post;
      }
    });
    console.log(post);
    setTitle(post.title);
    setMythos(post.mythos);
    setBody(post.body);
    setImage(post.image);
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
    console.log(image);
    const formData = new FormData();
    formData.append('title', title);
    formData.append('mythos', mythos);
    formData.append('body', body);
    formData.append('image', image);

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3000/posts/${postId}`, {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();
      if (response.ok) {
        console.log(result);
        const index = posts.findIndex((post) => post._id === result._id);
        const updatedPosts = posts.map((post, i) => {
          if (i === index) {
            return {
              ...post,
              title: result.title,
              mythos: result.mythos,
              body: result.body,
              image: result.image,
              dateUpdated: result.dateUpdated,
            };
          } else {
            return post;
          }
        });
        console.log(updatedPosts);
        setPosts(updatedPosts);
        navigate(`/manage-posts/${postId}`);
      } else {
        console.error(result);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="form-layout">
      <Form
        method="post"
        class="post-form"
        onSubmit={handleSubmit}
        buttonText="Submit Edits"
      >
        <h1 className="form-title">Edit Post</h1>
        <InputField
          label="Title"
          name="title"
          type="text"
          value={title}
          onChange={handleInput}
        />
        <label htmlFor="mythos">Mythos</label>
        <select
          name="mythos"
          id="mythos"
          ref={selectRef}
          onChange={handleInput}
        >
          <option value="" disabled selected>
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
  );
};

export default EditPostForm;
