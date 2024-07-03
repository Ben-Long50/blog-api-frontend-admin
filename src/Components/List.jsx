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
    <div ref={listRef} className="category-list">
      {props.children}
    </div>
  );
};

export default List;
