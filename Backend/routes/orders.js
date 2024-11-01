module.exports = (app, con) => {
    // Route to create an order
    app.post('/createOrder', (req, res) => {
        const {
            user_email,
            pizza_name,
            pizza_type,
            additional_comments,
            total_cost,
            selected_toppings 
        } = req.body;
    
        if (!user_email || !pizza_name || !pizza_type || !total_cost) {
            return res.status(400).json({ error: 'Missing required fields' });
        }
    
        const getUserSql = 'SELECT user_id FROM users WHERE LOWER(email) = LOWER(?)';
        con.query(getUserSql, [user_email], (err, userResults) => {
            if (err) {
                console.error('Error fetching user information:', err);
                return res.status(500).json({ error: 'Database error' });
            }
    
            if (userResults.length === 0) {
                return res.status(404).json({ error: 'User not found. Please enter a registered email.' });
            }
    
            const user_id = userResults[0].user_id;

            const reference_number = user_email;
    
            const getPizzaSql = 'SELECT pizza_id FROM pizzas WHERE name = ?';
            con.query(getPizzaSql, [pizza_name], (err, pizzaResults) => {
                if (err) {
                    console.error('Error fetching pizza:', err);
                    return res.status(500).json({ error: 'Database error' });
                }
    
                if (pizzaResults.length === 0) {
                    return res.status(404).json({ error: 'Pizza not found' });
                }
    
                const pizza_id = pizzaResults[0].pizza_id;
    
                const insertOrderSql = `
                    INSERT INTO orders 
                    (user_id, pizza_id, reference_number, pizza_type, additional_comments, total_cost, status)
                    VALUES (?, ?, ?, ?, ?, ?, 'new')`
                ;
                const orderValues = [user_id, pizza_id, reference_number, pizza_type, additional_comments || null, total_cost];
    
                con.query(insertOrderSql, orderValues, (err, orderResults) => {
                    if (err) {
                        console.error('Error creating order:', err);
                        return res.status(500).json({ error: 'Database error' });
                    }
    
                    const order_id = orderResults.insertId;
    
                    if (selected_toppings && selected_toppings.length > 0) {
                        const toppingsValues = selected_toppings.map((topping_id) => [order_id, topping_id]);
                        const insertToppingsSql = 'INSERT INTO order_toppings (order_id, topping_id) VALUES ?';
    
                        con.query(insertToppingsSql, [toppingsValues], (err) => {
                            if (err) {
                                console.error('Error adding toppings to order:', err);
                                return res.status(500).json({ error: 'Database error' });
                            }
    
                            res.status(201).json({ message: 'Order created successfully with toppings', order_id });
                        });
                    } else {
                        res.status(201).json({ message: 'Order created successfully without toppings', order_id });
                    }
                });
            });
        });
    });
    
      
  
  //Get My Orders
  app.get('/orders', (req, res) => {
      const sql = 
        `SELECT 
          orders.order_id, 
          users.name AS customer_name, 
          orders.pizza_type, 
          users.email AS reference_number,
          orders.additional_comments, 
          orders.total_cost, 
          orders.status
        FROM orders
        JOIN users ON orders.user_id = users.user_id`
      ;
      
      con.query(sql, (err, results) => {
        if (err) {
          console.error('Error fetching orders:', err);
          return res.status(500).json({ error: 'Database error' });
        }
    
        res.json({ orders: results });
      });
    });
  

    //Gets the orders to display on dashboard
    app.get('/DashboardOrders', (req, res) => {
        const sql = 
          `SELECT 
            orders.order_id, 
            pizzas.name AS pizza_name, 
            orders.pizza_type, 
            orders.status, 
            orders.additional_comments,
            orders.total_cost,
            orders.reference_number
          FROM orders
          JOIN pizzas ON orders.pizza_id = pizzas.pizza_id`
        ;
        
        con.query(sql, (err, results) => {
          if (err) {
            console.error('Error fetching orders:', err);
            return res.status(500).json({ error: 'Database error' });
          }
          res.json({ orders: results });
        });
      });
      
      
}