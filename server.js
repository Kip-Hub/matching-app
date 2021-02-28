const express = require('express');
const bodyParser = require('body-parser');
const slug = require('slug');
const port = 1900;
const app = express();
const path = require('path');
const MongoClient = require('mongodb').MongoClient;
var mongo = require('mongodb');
const urlencodedParser = bodyParser.urlencoded({ extended: false })

require('dotenv').config()

const url = 'mongodb+srv://' + process.env.DB_USER + ':' + process.env.DB_PASS + '@' + process.env.DB_HOST + '/' + process.env.DB_NAME + '?retryWrites=true&w=majority';

app.use(express.static('static/public'));

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('pages/index');
});

app.post('/', urlencodedParser, (req, res) => {
    MongoClient.connect(url, { useUnifiedTopology: true }, function(err, client) {
        if (err) {
            throw err
        } else {
            const db = client.db(process.env.DB_NAME);
            const collection = db.collection(process.env.DB_COLL);
            collection.find({}).toArray(function(err, result) {
                if (err) {
                    throw err
                } else {
                    console.log(result);
                }
            });
        }
    })

    res.render('pages/result', { data: req.body });
});

app.get('/profile/:userName', (req, res) => {
    res.render('pages/profile', { data: { userName: req.params.userName } });
});

app.get('*', (req, res, ) => {
    var img = '<img src= "/images/kat.jpg"/>';
    res.status(404).send('<h1>404 page not found</h1>' + img);
});

app.listen(port, () => {
    console.log('Listening on port ' + port);
});