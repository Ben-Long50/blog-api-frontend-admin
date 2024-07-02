import { Children } from 'react';
import { useState, useRef } from 'react';
import '../styles/list.css';

const List = (props) => {
  const [activeItem, setActiveItem] = useState(0);
  const listRef = useRef();

  const handleActive = (e, index) => {
    if (
      e.target === listRef.current.children[index] ||
      listRef.current.children[index].contains(e.target)
    ) {
      setActiveItem(index);
    }
  };

  return (
    <ul ref={listRef} className="category-list">
      {Children.map(props.children, (child, index) => (
        <li
          key={index}
          id={index}
          style={
            index === activeItem
              ? { backgroundColor: 'blue', color: 'white' }
              : { color: 'black' }
          }
          onClick={(e) => handleActive(e, index)}
        >
          {child}
        </li>
      ))}
    </ul>
  );
};

export default List;
