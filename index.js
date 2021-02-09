const express = require('express');
const port = 1900;


express()
    .get('/', onhome)
    .get('/about', onabout)
    .listen(port, () => {
        console.log('Listening on port ' + port)
    })


function onhome(req, res) {
    res.send('<h1>Hello world!</h1>\n')
}

function onabout(req, res) {
    res.send('<h1>About me</h1>\n')
}