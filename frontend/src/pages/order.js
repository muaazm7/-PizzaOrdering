import React, { useState, useEffect } from 'react';

export default function CreateOrder() {
  const [pizzas, setPizzas] = useState([]);
  const [selectedPizza, setSelectedPizza] = useState(null);
  const [toppings, setToppings] = useState([]);
  const [selectedToppings, setSelectedToppings] = useState([]);
  const [pizzaType, setPizzaType] = useState('thin');
  const [totalCost, setTotalCost] = useState(0);
  const [email, setEmail] = useState('');
  const [additionalComments, setAdditionalComments] = useState('');
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    fetchUserIdByEmail();
    fetchPizzas();
    fetchToppings();
  }, []);

  const fetchPizzas = async () => {
    try {
      const response = await fetch('http://localhost:3000/pizzas');
      const data = await response.json();
      setPizzas(data.pizzas);
    } catch (error) {
      console.error('Error fetching pizzas:', error);
    }
  };

  const fetchToppings = async () => {
    try {
      const response = await fetch('http://localhost:3000/toppings');
      const data = await response.json();
      setToppings(data.toppings);
    } catch (error) {
      console.error('Error fetching toppings:', error);
    }
  };

  const handlePizzaChange = (e) => {
    const pizzaId = e.target.value;
    const pizza = pizzas.find((p) => p.pizza_id === parseInt(pizzaId));
    setSelectedPizza(pizza);
    calculateTotalCost(pizza ? pizza.base_price : 0, selectedToppings);
  };

  const handleToppingChange = (toppingId) => {
    setSelectedToppings((prev) => {
      const updatedToppings = prev.includes(toppingId)
        ? prev.filter((id) => id !== toppingId)
        : [...prev, toppingId];
      calculateTotalCost(selectedPizza ? selectedPizza.base_price : 0, updatedToppings);
      return updatedToppings;
    });
  };

  const calculateTotalCost = (pizzaBasePrice, toppingsList) => {
    const toppingsCost = toppingsList.reduce((total, id) => {
      const topping = toppings.find((t) => t.topping_id === id);
      return topping ? total + topping.price : total;
    }, 0);
    setTotalCost(pizzaBasePrice + toppingsCost);
  };

  const fetchUserIdByEmail = async (email) => {
    try {
      const response = await fetch(`http://localhost:3000/getUserIdByEmail?email=${email}`);
      const data = await response.json();
      setUserId(data.user_id);
    } catch (error) {
      console.error('Error fetching user ID:', error);
    }
  };

  const handleEmailChange = (e) => {
    const emailValue = e.target.value;
    setEmail(emailValue);
    fetchUserIdByEmail(emailValue);
  };

  const handleSubmit = async () => {
    if (!userId) {
      alert("User ID not found. Please enter a registered email.");
      return;
    }

    const orderData = {
      user_email: email,
      pizza_name: selectedPizza ? selectedPizza.name : '',
      pizza_type: pizzaType,
      additional_comments: additionalComments,
      total_cost: totalCost,
      selected_toppings: selectedToppings 
    };

    try {
      const response = await fetch('http://localhost:3000/createOrder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      });
      const data = await response.json();
      console.log('Order created:', data);
    } catch (error) {
      console.error('Error creating order:', error);
    }
  };

  return (
    <div>
      <h2 style={styles.header}>Create Order</h2>

      <label style={styles.label}>
        Email:
        <input
          type="email"
          value={email}
          onChange={handleEmailChange}
          placeholder="Enter your email"
          style={styles.input}
        />
      </label>

      <label style={styles.label}>
        Select Pizza:
        <select onChange={handlePizzaChange} value={selectedPizza ? selectedPizza.pizza_id : ''} style={styles.input}>
          <option value="">-- Select a Pizza --</option>
          {pizzas.map((pizza) => (
            <option key={pizza.pizza_id} value={pizza.pizza_id}>
              {pizza.name} - R{pizza.base_price}
            </option>
          ))}
        </select>
      </label>

      <p style={styles.priceText}>Base Price: R{selectedPizza ? selectedPizza.base_price : '0.00'}</p>

      <label style={styles.label}>
        Pizza Type:
        <select value={pizzaType} onChange={(e) => setPizzaType(e.target.value)} style={styles.input}>
          <option value="thin">Thin</option>
          <option value="thick">Thick</option>
        </select>
      </label>

      <h3 style={styles.toppingsHeader}>Select Toppings:</h3>
      {toppings.map((topping) => (
        <div key={topping.topping_id} style={styles.topping}>
          <label style={styles.label}>
            <input
              type="checkbox"
              value={topping.topping_id}
              onChange={() => handleToppingChange(topping.topping_id)}
              style={styles.checkbox}
            />
            {topping.name} - R{topping.price}
          </label>
        </div>
      ))}

      <label style={styles.label}>
        Additional Comments:
        <textarea
          value={additionalComments}
          onChange={(e) => setAdditionalComments(e.target.value)}
          placeholder="Additional instructions..."
          style={styles.textarea}
        />
      </label>

      <h3 style={styles.priceText}>Total Cost: R{totalCost.toFixed(2)}</h3>

      <button onClick={handleSubmit} style={styles.button}>
        Place Order
      </button>
    </div>
  ); 
}

const styles = {
  header: {
    color: '#004080',
    textAlign: 'center',
  },
  label: {
    display: 'block',
    color: '#004080',
    fontWeight: 'bold',
    marginBottom: '5px',
  },
  input: {
    padding: '8px',
    fontSize: '1rem',
    marginTop: '5px',
    borderRadius: '4px',
    border: '1px solid #004080',
    width: '100%',
    color: '#004080',
  },
  textarea: {
    padding: '8px',
    fontSize: '1rem',
    borderRadius: '4px',
    border: '1px solid #004080',
    width: '100%',
    color: '#004080',
  },
  toppingsHeader: {
    color: '#004080',
  },
  priceText: {
    color: '#004080',
    fontWeight: 'bold',
  },
  button: {
    padding: '10px 20px',
    fontSize: '0.85rem',
    backgroundColor: '#004080',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginTop: '10px',
  },
  checkbox: {
    marginRight: '8px',
  },
};