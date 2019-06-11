// server.js: Main Program

var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');
var db         = require('./db');

// for getting get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = 3037;        // set my port

db.connect(function ConnectionHandler(err){
    if (err){
        console.log('Unable to connect to MySQL');
        process.exit(1);
    }
    console.log("Connection to MySQL Successfull");
});

// ROUTES FOR OUR API
// =============================================================================
app.all('/api', function HandleAll(request, response, next){
    console.log(request.connection.remoteAddress);
    next();
});

var cRouter = require('./router/categories.js');    // get an instance of the categories Router
var fRouter = require('./router/films.js');         // get an instance of the films Router

app.use(express.static('public'));

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', cRouter);
app.use('/api', fRouter);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
