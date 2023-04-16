import React, { useState } from "react";
import './ToDoList.css'


export default function ToDoList() {
  const [items, setItems] = useState([]);
  const [text, setText] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [charCount, setCharCount] = useState(0);

  function handleChange(e) {
    setText(e.target.value);
    setCharCount(e.target.value.length);
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!text.length) {
      return;
    }
    
    const newItem = {
      text,
      id: Date.now()
    };
    
    setItems(items.concat(newItem));
    setText("");
    setCharCount(0);
  }

  function removeItem(id) {
    setItems(items.filter((item) => item.id !== id));
  }
  function handleSearch(e) {
    setSearchTerm(e.target.value)
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
      <label htmlFor="new-todo">
        What needs to be done?
      </label>
    
      <input
      id="new-todo"
      type="text"
      onChange={handleChange}
      value={text}
      maxLength={1000} // Added maximum character length
    />
    {text.length > 1000 && <p>You have exceeded the maximum character limit.</p> }

      <button>
        Add #{items.length + 1}
      </button>
    </form>
     <p>Character count: {charCount} / 1000</p> 
    <label htmlFor="search-todo">Search:</label>
    <input 
      id="search-todo" 
      type="text" 
      onChange={handleSearch} 
      value={searchTerm} 
    />
    
    <ul>
      {items.filter((item) => item.text.toLowerCase().includes(searchTerm.toLowerCase())).map((item) => (
        <li key={item.id}>
          {item.text}
          <button onClick={() => removeItem(item.id)}>
            X
          </button>
        </li>
        ))}
    </ul>
    </div>
  )
}


