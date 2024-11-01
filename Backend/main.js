// main.js
var express = require('express');
var mysql = require("mysql");
var app = express();
app.use(express.json());
const { v4: uuidv4 } = require('uuid');
const cors = require('cors');

app.use(cors());

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'admin',
    database: 'sab&t_pizza'
});

con.connect(function(err) {
    if (err) {
        console.log(err);
    } else {
        console.log("Connected to the database");
    }
});

require('./routes/orders')(app, con);
require('./routes/pizza')(app, con);
require('./routes/user')(app, con);

app.listen(3000, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("Server is running on Port: 3000");
    }
});
