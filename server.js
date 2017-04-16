const express    = require('express');
const bodyParser = require('body-parser');
const url        = require('url');

function checkHeader(req, res, next) {
    req.header('Header') ? next() : res.sendStatus(401);
}

module.exports = port => {
    const app = express();

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));

    app.get('/', (req, res) => {
        res.status(200);
        res.send('Hello, Express.js');
    });

    app.get('/hello', (req, res) => {
        res.status(200);
        res.send('Hello stranger!');
    });

    app.get('/hello/:name', (req, res) => {
        res.status(200);
        res.send(`Hello, ${req.params.name}!`);
    });

    app.all('/sub/*', (req, res) => {
        let uri = url.format({
            protocol: req.protocol,
            host: req.get('host'),
            pathname: req.originalUrl
        });

        res.status(200);
        res.send(`You requested URI: ${uri}`);
    });

    app.post('/post', checkHeader, (req, res) => {
        Object.keys(req.body).length ? res.json({ body: req.body }) : res.sendStatus(404);
    });

    app.listen(port, () => {
        console.log(`Start http server at ${port}`);
    });
}
