module.exports = (app, con) => {

    // Route to add a pizza
    app.post('/addPizza', (req, res) => {
      const name = req.body.name;
      const base_price = req.body.base_price;
  
      if (!name || base_price == null) { 
          return res.status(400).json({ message: "Pizza name and base price are required." });
      }
  
          const insertPizzaSql = 'INSERT INTO pizzas (name, base_price) VALUES (?, ?)';
          con.query(insertPizzaSql, [name, base_price], (err, result) => {
              if (err) {
                  console.error(err);
                  return res.status(500).json({ message: "An error occurred while adding the pizza." });
              } else {
                  res.status(201).json({ message: "Pizza added successfully." });
              }
          });
  });
  

  app.post('/addToppings', (req, res) => {
    const name = req.body.name;
    const price = req.body.base_price;

    if (!name || price == null) { 
        return res.status(400).send("Topping name and base price are required.");
    }

    const sql = 'INSERT INTO toppings (name, price) VALUES (?, ?)';
    con.query(sql, [name, price], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send("An error occurred while adding the topping.");
        } else {
            res.status(201).send("Topping added successfully.");
        }
    });
   });


  app.get('/toppings', (req, res) => {
      const sql = 'SELECT * FROM toppings';
      
      con.query(sql, (err, results) => {
        if (err) {
          console.error('Error fetching toppings:', err);
          return res.status(500).json({ error: 'Database error' });
        }
    
        res.json({ toppings: results });
      });
  });
    
  app.get('/pizzas', (req, res) => {
    const sql = 'SELECT * FROM pizzas';
    
    con.query(sql, (err, results) => {
      if (err) {
        console.error('Error fetching pizzas:', err);
        return res.status(500).json({ error: 'Database error' });
      }
  
      res.json({ pizzas: results });
     });
    });
    
  app.delete('/deletePizza/:id', (req, res) => {
    const pizzaId = req.params.id;
  
    const deletePizzaSql = 'DELETE FROM pizzas WHERE pizza_id = ?';
    con.query(deletePizzaSql, [pizzaId], (err, result) => {
      if (err) {
        console.error('Error deleting pizza:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Pizza not found' });
      }
      res.status(200).json({ message: 'Pizza deleted successfully' });
    });
  });
  
  app.delete('/deleteTopping/:id', (req, res) => {
    const toppingId = req.params.id;
  
    const deleteToppingSql = 'DELETE FROM toppings WHERE topping_id = ?';
    con.query(deleteToppingSql, [toppingId], (err, result) => {
      if (err) {
        console.error('Error deleting Topping:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Topping not found' });
      }
      res.status(200).json({ message: 'Topping deleted successfully' });
    });
  });

}