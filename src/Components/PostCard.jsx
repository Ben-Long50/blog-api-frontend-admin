import { useState, useContext } from 'react';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import Button from './Button';
import { AuthContext } from './AuthContext';

const PostCard = (props) => {
  const [active, setActive] = useState(props.active);
  const { apiUrl } = useContext(AuthContext);
  const dateUpdated = format(props.dateUpdated, 'PP');
  const dateCreated = format(props.dateCreated, 'PP');

  const handleActive = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${apiUrl}/${props.id}/activity`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        setActive(!active);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="post-card" key={props.id}>
      <Link to={props.id}>
        <img className="card-image" src={props.image} alt="" />
      </Link>
      <div className="card-info">
        <h2 className="card-title">{props.title}</h2>
        <Button
          text={!active ? 'Draft' : 'Active'}
          onClick={handleActive}
          classes={`status-button ${active && 'button-active'}`}
        />
        <p className="updated-label">Created:</p>
        <p className="date">{dateCreated}</p>
        <p className="updated-label">Last Updated:</p>
        <p className="date">{dateUpdated}</p>
      </div>
    </div>
  );
};

export default PostCard;
