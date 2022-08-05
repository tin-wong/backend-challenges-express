require('dotenv').config()
let express = require('express');
let app = express();

app.use((req, res, next) => {
    console.log(req.method + " " + req.path + " - " + req.ip);
    next();
})
app.use(express.static(__dirname + "/public"));
app.use("/public", express.static(__dirname + "/public"));
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/views/index.html');
})

app.get('/json', (req, res) => {
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
app.get('/name', (req, res) => {
    res.json({name: req.query.firstname + " " + req.query.lastname});
    next();
})






























 module.exports = app;