const express = require('express');
const bodyParser = require('body-parser');
const slug = require('slug');
const port = 1900;
const app = express();
const path = require('path');
const urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(express.static('static/public'));

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('pages/index');
});

app.post('/', urlencodedParser, (req, res) => {
    res.render('pages/result', { data: req.body });
});

app.get('/profile/:userName', (req, res) => {
    res.render('pages/profile', { data: { userName: req.params.userName } });
});

app.use((req, res, ) => {
    var img = '<img src= "/images/kat.jpg"/>';
    res.status(404).send('<h1>404 page not found</h1>' + img);
});

app.listen(port, () => {
    console.log('Listening on port ' + port);
});