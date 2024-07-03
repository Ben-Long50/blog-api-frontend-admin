import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useOutletContext } from 'react-router-dom';
import Button from './Button';
import List from './List';

const PostDetail = () => {
  const [postDetails, setPostDetails] = useState('');
  const { postId } = useParams();
  const [posts, setPosts, mythosCategories] = useOutletContext();

  const navigate = useNavigate();

  useEffect(() => {
    const post = posts.find((post) => {
      if (post._id === postId) {
        return post;
      }
    });
    setPostDetails(post);
  }, []);

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3000/posts/${postId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const result = await response.json();
      if (response.ok) {
        console.log(result);
        const existingPosts = posts.filter((post) => {
          if (post._id !== postId) {
            return post;
          }
        });
        setPosts(existingPosts);
        navigate('/manage-posts');
      } else {
        console.error(result);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="post-layout">
      <h1 className="header">Post Preview</h1>
      <List>
        <Link to="edit-post" state={{ postId }}>
          <Button text="Edit Post" />
        </Link>
        <Button text="Delete Post" onClick={handleDelete} />
      </List>
      <div className="post-contents">
        <img className="post-image" src={postDetails.image} alt="hello" />
        <h1 className="post-title">{postDetails.title}</h1>
        <main
          className="post-body"
          dangerouslySetInnerHTML={{ __html: postDetails.body }}
        ></main>
      </div>
    </div>
  );
};

export default PostDetail;
