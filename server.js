var express = require("express");
var mongodb = require('mongodb');
var bodyParser = require('body-parser');
const cors = require('cors');
var port = 5000;

var app = express();
var dbConn = mongodb.MongoClient.connect('mongodb://localhost:27017/To-do-App');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

app.post("/addTask", (req, res) => {
	dbConn.then(function(db) {
        db.collection('Todos').insertOne(req.body);
    	res.send("Data added in database");
    }) 
});

app.get('/getTask',  function(req, res) {
    dbConn.then(function(db) {
        db.collection('Todos').find().toArray().then(function(data) {
        	console.log(data)
            res.send(data);
        });
    });
});
 
app.post('/delTask',  function(req, res) {
    dbConn.then(function(db) {
        db.collection('Todos').deleteOne(req.body);
        res.send("Task Removed")
    });
});

app.post('/updateTask',  function(req, res) {
    dbConn.then(function(db) {
        db.collection('Todos').updateOne({task_id : req.body.task_id}, {$set : req.body});
        res.send("Task Updated")
    });
});

app.listen(port, () => {
 console.log("Server listening on port " + port);
});

