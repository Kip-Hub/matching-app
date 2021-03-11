const express = require('express');
const bodyParser = require('body-parser');
const port = process.env.PORT || 1900;
const app = express();
const urlencodedParser = bodyParser.urlencoded({ extended: false })
require('dotenv').config()
const { MongoClient } = require("mongodb");
const url = 'mongodb+srv://' + process.env.DB_USER + ':' + process.env.DB_PASS + '@' + process.env.DB_HOST + '?retryWrites=true&w=majority';
const client = new MongoClient(url, { useUnifiedTopology: true });
const ObjectId = require("mongodb").ObjectID;


// Database connection with MongoDB
async function mongoConnect() {
    try {
        await client.connect()
        console.log("Connected to mongodb")
    } catch (err) {
        console.log(err)
    }
}
mongoConnect();

// Middleware to access static files such as CSS
app.use(express.static('static/public'));

// Setting the view engine for templating to be handled by EJS
app.set('view engine', 'ejs');

// Home page
app.get('/', (req, res) => {
    res.render('pages/index');
});

// Post request handled when form on homepage is submitted
app.post('/', urlencodedParser, (req, res) => {
    const db = client.db(process.env.DB_NAME);
    const users = db.collection(process.env.DB_COLL);
    const query = {
        game: req.body.game,
        platform: req.body.platform,
        playertype: req.body.playertype
    };

    // Find result matching the submitted criteria
    users.find(query).toArray((err, result) => {
        if (err) {
            throw err
        } else {
            res.render('pages/result', { users: result });
        }
    })
});

// Get request for the profile page
app.get('/profile', (req, res) => {
    const db = client.db(process.env.DB_NAME);
    const users = db.collection(process.env.DB_COLL);
    const id = { _id: ObjectId("60457d71f75d0ee05a6618fd") };

    // Find and show the user who is "logged in"
    users.find(id).toArray((err, result) => {
        if (err) {
            throw err
        } else {
            res.render('pages/profile', { users: result });
        }
    })
});

// get request for the edit page (edit data on the profile)
app.get('/edit', (req, res) => {
    res.render('pages/edit');
});

// post request handles the submitted form with the new data
app.post('/edit', urlencodedParser, (req, res) => {
    const db = client.db(process.env.DB_NAME);
    const users = db.collection(process.env.DB_COLL);

    const document = {
        $set: {
            name: req.body.name,
            nationality: req.body.nationality,
            age: req.body.age,
            game: req.body.game,
            playertype: req.body.playertype,
            platform: req.body.platform,
            rank: req.body.rank
        }
    };

    const filter = { _id: ObjectId("60457d71f75d0ee05a6618fd") };
    const options = { upsert: true };

    // updates the existing data to the newly submitted data
    users.updateOne(filter, document, options);

    // renders the updated profile afterwards
    users.find(filter).toArray((err, result) => {
        if (err) {
            throw err
        } else {
            res.render('pages/profile', { users: result });
        }
    })

});

// handles any non existing paths, and shows a 404 page
app.get('*', (req, res, ) => {
    var img = '<img src= "/images/kat.jpg"/>';
    res.status(404).send('<h1>404 page not found</h1>' + img);
});

// App is "listening" to http requests on port 1900
app.listen(port, () => {
    console.log('Listening on port ' + port);
});