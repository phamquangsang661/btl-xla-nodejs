
const express = require('express');
const bodyParser = require('body-parser');
const dotnev = require('dotenv');
const app = express();
const port = process.env.PORT || 6001;
import apiRouter from "./router/index";
dotnev.config();
//Access for public url
app.use(express.static('public'))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));
app.set('view engine', 'ejs');

app.use(apiRouter);

app.listen(port, function () {
    console.log('Server is running on PORT', port);
});