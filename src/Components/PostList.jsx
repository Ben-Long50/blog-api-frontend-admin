import { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import '../styles/form.css';
import '../styles/post.css';
import PostCard from './PostCard';
import List from './List';

const PostList = () => {
  const [posts, setPosts, mythosCategories] = useOutletContext();
  const [activeCategory, setActiveCategory] = useState('All');
  const [filteredPosts, setFilteredPosts] = useState(posts);

  useEffect(() => {
    if (activeCategory !== 'All') {
      setFilteredPosts(
        posts.filter((post) => {
          if (post.mythos === activeCategory) {
            return post;
          }
        }),
      );
    } else {
      setFilteredPosts(posts);
    }
  }, [activeCategory, posts]);

  const handleCategory = (e) => {
    if (mythosCategories.includes(e.target.textContent)) {
      setActiveCategory(e.target.textContent);
    } else {
      setActiveCategory('All');
    }
  };

  return (
    <>
      <List>
        <div onClick={handleCategory}>All</div>
        {mythosCategories.map((category, index) => {
          return (
            <div key={index} onClick={handleCategory}>
              {category}
            </div>
          );
        })}
      </List>
      <div className="post-card-layout">
        {filteredPosts.map((post) => {
          return (
            <PostCard
              key={post._id}
              id={post._id}
              image={post.image}
              title={post.title}
              dateUpdated={post.dateUpdated}
              dateCreated={post.dateCreated}
              active={!post.draft}
            />
          );
        })}
      </div>
    </>
  );
};

export default PostList;
