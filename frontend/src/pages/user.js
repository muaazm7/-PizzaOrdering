import React, { useState } from 'react';

export default function AddUser() {
  const [name, setName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !contactNumber || !email || !password || !role) {
      setMessage('Please fill in all fields.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/signupUser', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, contactNumber, email, password, role }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('User added successfully!');
        setName('');
        setContactNumber('');
        setEmail('');
        setPassword('');
        setRole('');
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('An error occurred while adding the user.');
    }
  };

  return (
    <div>
      <h2>Add a New User</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit} style={styles.form}>
        <label style={styles.label}>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={styles.input}
            placeholder="Enter your name"
          />
        </label>
        <label style={styles.label}>
          Contact Number:
          <input
            type="text"
            value={contactNumber}
            onChange={(e) => setContactNumber(e.target.value)}
            style={styles.input}
            placeholder="Enter Contact Number"
          />
        </label>
        <label style={styles.label}>
          Email:
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
            placeholder="Enter Email"
          />
        </label>
        <label style={styles.label}>
          Password:
          <input
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            placeholder="Enter Password"
          />
        </label>
        <label style={styles.label}>
          Role:
          <input
            type="text"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            style={styles.input}
            placeholder="admin/user"
          />
        </label>
        <button type="submit" style={styles.button}>Create User</button>
      </form>
    </div>
  );
}

const styles = {
  form: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '300px',
    margin: 'auto',
  },
  label: {
    marginBottom: '10px',
    color : '#004080',
    fontWeight: 'bold',
  },
  input: {
    padding: '8px',
    fontSize: '1rem',
    marginTop: '5px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    color: '#004080',
  },
  button: {
    padding: '10px',
    fontSize: '1rem',
    backgroundColor: '#004080',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginTop: '15px',
  },
};