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

app.get('/add', function (req, res) {
    res.sendFile(path.resolve(__dirname, 'public', 'add-item.html'));
});

app.get('/search', function (req, res) {
    res.sendFile(path.resolve(__dirname, 'public', 'search.html'));
});

async function onSaveCard(req, res) {
    const result = await collection.insertOne(req.body);
    console.log(`Document ID: ${result.insertedId}`)
    result.ops[0].itemId = result.insertedId;
    res.json(result.ops[0]);
}
app.post('/save', jsonParser, onSaveCard);


async function onGet(req, res) {
    let id = new ObjectID(req.params.itemId);
    const response = await collection.findOne({ "_id": id });
    res.json(response);
}
app.get('/get/:itemId', onGet);
