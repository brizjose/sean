const express = require('express');
const body_parser = require('body-parser');

const store = require('./store');

const app = express();

app.use(express.static('public'));
app.use(body_parser.json());

// routes 
app.post('/createUser', (request, response) => {
    store.createUser({
        username: request.body.username,
        password: request.body.password,
    })
    .then(() => response.sendStatus(200));
})

app.post('/login', (request, response) => {
    store.authenticate({
        username: request.body.username,
        password: request.body.password
    })
    .then(({success}) => {
        if (success) response.sendStatus(200);
        else response.sendStatus(401);
    });
})


app.listen(7555, () => console.log('Server running on http://localhost7555'));

