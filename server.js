const express = require('express');
const port = 1900;
const app = express();
const path = require('path');

app.get('/', (req, res) => {
    res.send('<h1>Hello world!</h1>');
});

app.get('/profile', (req, res) => {
    res.sendFile(path.join(__dirname, 'static/public', 'index.html'));
});

app.use(express.static('static/public'));

app.use((req, res, ) => {
    var img = '<img src= "/images/kat.jpg"/>';
    res.status(404).send('<h1>404 page not found</h1>' + img);
});

app.listen(port, () => {
    console.log('Listening on port ' + port);
});