const mysql = require('mysql');

// configure DB
const db = mysql.createConnection ({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'socka',
})

// connect to database
db.connect((err) => {
    if(err) {
        throw err;
    }
    console.log('Connected to socka players database!');
});

module.exports = db;