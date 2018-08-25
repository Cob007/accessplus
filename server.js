/**
 * Created by michealcob on 7/11/18.
 */

const express = require('express');
const bodyParser = require('body-parser');

// Configuring the database
const dbConfig = require('./config/database.config.js');

const mongoose = require('mongoose');

var port =process.env.PORT || 3030;

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url)
.then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...');
    process.exit();
});

// create express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

// define a simple route
app.get('/', (req, res) => {
    res.json({"message": "access control application that helps institutions monitor, inflow and exit of visitors"});
});

// Require Visitors routes
require('./app/routes/visitor.routes.js')(app);

// listen for requests
app.listen(port, () => {
    console.log("Server is listening on port 3030");
});
