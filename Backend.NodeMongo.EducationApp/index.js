const express = require('express');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const url = 'mongodb://127.0.0.1:27017/DEV_EducationAppDB'
mongoose.connect(url, { useNewUrlParser: true })
const database = mongoose.connection;
var cors = require('cors');

database.on('error', (error) => {
    console.log(error)
})
database.once('connected', () => {
    console.log('Database Connected');
})

const app = express();
app.use(express.json());

app.listen(3000, () => {
    console.log(`Server Started at ${3000}`)
})

const routes = require('./routes');

app.use(cors()); // Use this after the variable declaration
// Add headers before the routes are defined
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});


app.use(fileUpload());
app.use('/api', routes);

//This will redirect any route not handled to the index "/"
app.get('/', function (req, res) {
    res.redirect('/api/api-docs');
});
//Invalid Uri
app.use(function (req, res) {
    res.status(200).json({ message: 'Oops ? Requested Uri Is Not Found!' });
});

// Function to serve all static files
// inside public directory.
app.use(express.static('public'));
app.use('/images/', express.static('app_images'));





