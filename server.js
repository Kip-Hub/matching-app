const express = require('express');
const port = 1900;
const app = express();
const path = require('path');

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('pages/index');
});

app.get('/profile', (req, res) => {
    res.render('pages/profile');
});

app.use(express.static('static/public'));

app.use((req, res, ) => {
    var img = '<img src= "/images/kat.jpg"/>';
    res.status(404).send('<h1>404 page not found</h1>' + img);
});

app.listen(port, () => {
    console.log('Listening on port ' + port);
});