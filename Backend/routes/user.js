module.exports = (app, con) =>{
    app.get('/getUserIdByEmail', (req, res) => {
        const { email } = req.query;
        if (!email) {
            return res.status(400).json({ error: 'Email is required' });
        }
      
        const getUserSql = 'SELECT user_id FROM users WHERE LOWER(email) = LOWER(?)';
        con.query(getUserSql, [email], (err, results) => {
            if (err) {
                console.error('Error fetching user by email:', err);
                return res.status(500).json({ error: 'Database error' });
            }
      
            if (results.length === 0) {
                return res.status(404).json({ error: 'User not found. Please enter a registered email.' });
            }
      
            const user_id = results[0].user_id;
            res.json({ user_id });
        });
      });
      

      app.post('/signupUser', (req, res) =>{
        const { name, contact_number, email, password, role = 'user' } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ error: 'Name, email, and password are required.' });
    }

    const checkEmailSql = 'SELECT * FROM users WHERE email = ?';
    con.query(checkEmailSql, [email], (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ error: 'Database error' });
        }

        if (results.length > 0) {
            return res.status(400).json({ error: 'Email already exists.' });
        }

        const insertUserSql = `INSERT INTO users (name, contact_number, email, password, role) VALUES (?, ?, ?, ?, ?)`
        ;
        con.query(insertUserSql, [name, contact_number, email, password, role], (err, result) => {
            if (err) {
                console.error('Database error:', err);
                return res.status(500).json({ error: 'An error occurred while adding the user.' });
            }
            
            res.status(201).json({ message: 'User added successfully.' });
        });
    });
      })
}