// Imports
var express     = require('express');
var bodyParser  = require('body-parser');
const dotenv = require('dotenv');
require('dotenv').config();


//importer l'application APP.JS
const app = require('./app.js');


// Instantiate server
var server = express();

// Body Parser configuration
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());



// Configure routes
server.get('/', function (req, res) {
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send('<h1>Bonjour sur mon super server</h1>');
});



// Launch server
server.listen(3000, function() {
    console.log('Server en écoute :)');
});

