// Imports
var express     = require('express');
var bodyParser  = require('body-parser');
const dotenv = require('dotenv');
require('dotenv').config();
// Import Sequelize Connection
const sequelize = require('sequelize');


//importer l'application APP.JS
const app = require('./app.js');


// Instantiate server
var server = express();

// Body Parser configuration
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));




// Configure routes
server.get('/', function (req, res) {
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send('<h1>Bonjour sur mon super server</h1>');
});



// Launch server
server.listen(3000, function() {
    console.log('Server en écoute sur le PORT 3000');
});

