const express = require('express');
const path = require('path');
const mongodb = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectId;

const MONGO_URL = 'mongodb://localhost:27017/invy';
const app = express();
const jsonParser = express.json();

app.use(express.static('public'));

let db = null;
let collection = null;

async function startDbAndServer() {
    db = await mongodb.connect(MONGO_URL);
    collection = db.collection('clothes');
    startServer();
};

function startServer() {
    app.listen(3000, function () {
        console.log("Listening on port 3000");
    })
}
startDbAndServer();

app.get('/', function (req, res) {
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

async function onSave(req, res) {
    const result = await collection.insertOne(req.body);
}
app.post('/save', jsonParser, onSave);


async function onGet(req, res) {
    let query = new ObjectID(req.params);
}
