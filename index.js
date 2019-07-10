const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const save = require('./modules/save');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/save', save);

app.listen('8089', (err) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log('start server...')
})
