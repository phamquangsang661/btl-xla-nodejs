
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 6001;
const router = require('./router');

//Access for public url
app.use(express.static('public'))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));
app.set('view engine', 'ejs');

app.use('/upload', router);

app.listen(port, function () {
    console.log('Server is running on PORT', port);
});