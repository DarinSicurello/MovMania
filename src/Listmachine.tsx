import React, { useState } from 'react';

const ListMachine: React.FC = () => {
  const [items, setItems] = useState<string[]>(['Die Hard', 'Top Gun', 'Star Wars']);
  const [newItem, setNewItem] = useState<string>('');

  const handleAddItem = (): void => {
    if (newItem.trim() === '') return;
    setItems((prevItems) => [...prevItems, newItem]);
    setNewItem('');
  };

  const handleDelete = (index: number): void => {
    setItems((prevItems) => prevItems.filter((_, i) => i !== index));
  };

  return (
    <div className="main-con d-flex">
      <div className="left-section me-4">
        <h2>My Movie Machine</h2>
        <label htmlFor="user-input">New Item:</label>
        <input
          type="text"
          id="user-input"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          placeholder="Avatar..."
          className="form-control my-2"
        />
        <button className="btn btn-primary" onClick={handleAddItem}>
          Submit New Item
        </button>
      </div>

      <div className="right-section">
        <h2>Your Movie List</h2>
        <div className="item-container">
          {items.map((item, index) => (
            <div
              key={index}
              className="item-box d-flex justify-content-between align-items-center mb-2 p-2 border"
            >
              {item}
              <button className="btn btn-sm btn-danger" onClick={() => handleDelete(index)}>
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ListMachine;
