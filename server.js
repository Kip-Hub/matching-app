const express = require('express');
const bodyParser = require('body-parser');
const port = 1900;
const app = express();
const urlencodedParser = bodyParser.urlencoded({ extended: false })
require('dotenv').config()
const { MongoClient } = require("mongodb");
const url = 'mongodb+srv://' + process.env.DB_USER + ':' + process.env.DB_PASS + '@' + process.env.DB_HOST + '?retryWrites=true&w=majority';
const client = new MongoClient(url, { useUnifiedTopology: true });

async function mongoConnect() {
    try {
        await client.connect()
        console.log("Connected to mongodb")
    } catch (err) {
        console.log(err)
    }
}
mongoConnect();

app.use(express.static('static/public'));

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('pages/index');
});

app.post('/', urlencodedParser, (req, res) => {
    const db = client.db(process.env.DB_NAME);
    const users = db.collection(process.env.DB_COLL);

    users.find({}).toArray((err, result) => {
        if (err) {
            throw err
        } else {
            console.log(result);
            const resultString = JSON.stringify(result);
            res.render('pages/result', { resultString });
        }
    })
});

app.get('/profile', (req, res) => {
    res.render('pages/profile');
});


app.get('*', (req, res, ) => {
    var img = '<img src= "/images/kat.jpg"/>';
    res.status(404).send('<h1>404 page not found</h1>' + img);
});

app.listen(port, () => {
    console.log('Listening on port ' + port);
});