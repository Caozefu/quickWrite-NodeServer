const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const router = require('./router');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/api', router);

app.listen('8089', (err) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log('start server at 8089')
});
