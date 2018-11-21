const express = require('express');
const body_parser = require('body-parser');
const path = require('path');
const logger = require('morgan');
const fileUpload = require('express-fileupload');
const app = express();

const port = process.env.PORT || 5000;

// database
require('./server/config/database');

// configure middleware
app
.use(body_parser.urlencoded({extended:true}))
.use(body_parser.json())
.use(logger('dev'))
.use(fileUpload())
.use((request, _response, next) => {
    console.log(`incoming request for ${request.url}`);
    next();
})
.use(express.static(path.resolve('dist/public')))
.use('/api', require('./server/config/routes'))
.use(require('./server/config/routes/catch-all.route'))

app.listen(port, () => console.log(`Express listening on port ${port}`));