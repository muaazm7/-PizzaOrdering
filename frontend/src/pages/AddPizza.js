import React, { useState } from 'react';

export default function AddPizza() {
  const [name, setName] = useState('');
  const [basePrice, setBasePrice] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();


    if (!name || !basePrice) {
      setMessage('Please fill in all fields.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/addPizza', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, base_price: parseFloat(basePrice) }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Pizza added successfully!');
        setName(''); 
        setBasePrice('');
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('An error occurred while adding the pizza.');
    }
  };

  return (
    <div>
      <h2>Add a New Pizza</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit} style={styles.form}>
        <label style={styles.label}>
          Pizza Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={styles.input}
            placeholder="Enter pizza name"
          />
        </label>
        <label style={styles.label}>
          Base Price (R):
          <input
            type="number"
            value={basePrice}
            onChange={(e) => setBasePrice(e.target.value)}
            style={styles.input}
            placeholder="Enter base price 00.00"
          />
        </label>
        <button type="submit" style={styles.button}>Create Pizza</button>
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
