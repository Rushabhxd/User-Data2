import React, { useState } from 'react';

const UserList = () => {
  const [users, setUsers] = useState([
    { id: 101, name: 'Rushabh xD', age: 20 },
    { id: 102, name: 'Dhavl Sir', age: 30 },
    { id: 103, name: 'Rushil R.K.S', age: 22 },
    { id: 104, name: 'Virat', age: 36 },
    { id: 105, name: 'Dhoni', age: 52 },
    { id: 106, name: 'Sachin', age: 60 },
    { id: 107, name: 'Hardik', age: 31 }
  ]);

  const [editingUser, setEditingUser] = useState(null);
  const [editedName, setEditedName] = useState('');
  const [editedAge, setEditedAge] = useState('');
  const [newName, setNewName] = useState('');
  const [newAge, setNewAge] = useState('');

  const [count, setCount] = useState(0);

  const handleDelete = (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this user?');
    if (confirmDelete) {
      const updatedUsers = users.filter(user => user.id !== id);
      setUsers(updatedUsers);
      alert('The data has been deleted!');
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user.id);
    setEditedName(user.name);
    setEditedAge(user.age);
  };

  const handleSave = (id) => {
    const updatedUsers = users.map(user => {
      if (user.id === id) {
        return { ...user, name: editedName, age: Number(editedAge) };
      }
      return user;
    });
    setUsers(updatedUsers);
    setEditingUser(null);
  };

  const handleAddUser = () => {
    if (newName.trim() === '' || newAge.trim() === '') {
      alert('Please enter both name and age!');
      return;
    }

    const newId = Math.max(...users.map(user => user.id)) + 1;
    const newUser = {
      id: newId,
      name: newName,
      age: Number(newAge)
    };
    setUsers([...users, newUser]);
    setNewName('');
    setNewAge('');
  };

  const handleStartCount = () => {
    const newCount = count + 1;
    setCount(newCount);

    if (newCount === 25) {
      alert('Count reached 25!');
    }
  };

  return (
    <div className="container">
      <h2>User List</h2>

      {/* Add New User Form */}
      <div className="add-user-form">
        <input
          type="text"
          placeholder="Name"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Age"
          value={newAge}
          onChange={(e) => setNewAge(e.target.value)}
        />
        <button className="save-btn" onClick={handleAddUser}>Add User</button>
      </div>

      {/* Counter Section */}
      <div className="counter-section">
        <h3>Counter: {count}</h3>
        <button className="count-btn" onClick={handleStartCount}>Count</button>
      </div>

      {/* User Table */}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Age</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>
                {editingUser === user.id ? (
                  <input
                    type="text"
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                  />
                ) : (
                  user.name
                )}
              </td>
              <td>
                {editingUser === user.id ? (
                  <input
                    type="number"
                    value={editedAge}
                    onChange={(e) => setEditedAge(e.target.value)}
                  />
                ) : (
                  user.age
                )}
              </td>
              <td>
                {editingUser === user.id ? (
                  <button className="save-btn" onClick={() => handleSave(user.id)}>Save</button>
                ) : (
                  <>
                    <button className="edit-btn" onClick={() => handleEdit(user)}>Edit</button>
                    <button className="delete-btn" onClick={() => handleDelete(user.id)}>Delete</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
