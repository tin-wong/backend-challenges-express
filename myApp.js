require('dotenv').config()
let express = require('express');
let app = express();
let bodyParser = require('body-parser');

app.use((req, res, next) => {
    console.log(req.method + " " + req.path + " - " + req.ip);
    next();
})

// Serve Static Assets at /public/style.css
app.use("/public", express.static(__dirname + "/public"));

// Use body-parser to Parse POST Requests
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Serve an HTML File
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/views/index.html');
})

// Serve JSON on a Specific Route
app.get('/json', (req, res) => {
    // Use the .env File
    if(process.env.MESSAGE_STYLE === "uppercase"){
        res.json({message: "HELLO JSON"});
    } else {
        res.json({message: "Hello json"});
    }
})

// Chain Middleware to Create a Time Server
app.get('/now', (req, res, next) => {
    req.time = new Date().toString();
    next();
}, (req, res) => {
    res.json({time: req.time})
})

// Get Route Parameter Input from the Client
app.get('/:word/echo', (req, res, next) => {
    res.json({echo: req.params.word});
    next();
})

// Get Query Parameter Input from the Client
app.get('/name', (req, res, next) => {
    res.json({name: req.query.first + " " + req.query.last});
}).post('/name', (req, res, next) => {
    res.json({name: req.body.first + " " + req.body.last})
})
    

// Get Data from POST Requests































 module.exports = app;