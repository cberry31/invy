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

app.get('/edit/:itemID', function (req, res) {
    res.sendFile(path.resolve(__dirname, 'public', 'edit.html'));
});

async function onSave(req, res) {
    Object.keys(req.body).forEach(k => (!req.body[k] && req.body[k] !== undefined) && delete req.body[k]);
    const result = await collection.insertOne(req.body);
    console.log(`Document ID: ${result.insertedId}`)
    result.ops[0].itemId = result.insertedId;
    res.json(result.ops[0]);
}
app.post('/save', jsonParser, onSave);

async function onGet(req, res) {
    let id = new ObjectID(req.params.itemId);
    const response = await collection.findOne({ "_id": id });
    res.json(response);
}
app.get('/get/:itemId', onGet);

async function onSearch(req, res) {
    let searchQuery = await createQuery(req.body);
    let result = await getResults(searchQuery);
    res.json(result);
}
app.post('/query', jsonParser, onSearch)

async function createQuery(params) {
    Object.keys(params).forEach(k => (!params[k] && params[k] !== undefined) && delete params[k]);
    return params
}

function getResults(searchQuery) {
    return new Promise(data => {
        collection.find(searchQuery).toArray(function (err, result) {
            if (err) {
                throw err;
            }
            data(result);
        });
    });
}

async function editItem(req, res) {
    let id = new ObjectID(req.body._id);
    delete req.body._id;
    await collection.replaceOne({ "_id": id }, req.body);
}
app.post('/saveEdit', jsonParser, editItem);

async function deleteItem(req, res) {
    let id = new ObjectID(req.body._id);
    await collection.deleteOne({ "_id": id });
}
app.post('/delete', jsonParser, deleteItem);