const express = require('express');
const port = 1900;
const app = express();

app.get('/', (req, res) => {
    res.send('<h1>Hello world!</h1>');
});

app.get('/about', (req, res) => {
    res.send('<h1>About me</h1>');
});

app.use(express.static('static/public'));

app.use((req, res, ) => {
    var img = '<img src= "/images/kat.jpg"/>';
    res.send('<h1>404</h1>' + img);
});

app.listen(port, () => {
    console.log('Listening on port ' + port);
});