const express = require('express');
const bodyParser = require('body-parser');
const product = require('./src/routes/product.routes'); // Imports routes for the products
const app = express();

// Set up mongoose connection
const mongoose = require('mongoose');
// let dev_db_url = 'mongodb://someuser:abcd1234@ds123619.mlab.com:23619/productstutorial';
// let dev_db_url = 'mongodb://shivangi:abcd12345@ds019664.mlab.com:19664/products';
let dev_db_config =`mongodb://shivangi:${encodeURIComponent('abcd12345')}@ds019664.mlab.com:19664/products`; 

let mongoDB = dev_db_config;
mongoose.connect(encodeURI(mongoDB),
    { useNewUrlParser: true }
    , function(err, db) {
        console.log('error in mongo connection',err);
        console.log('db in mongo connection',db);        
    });
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/products', product);

let port = 1234;

app.listen(port, () => {
    console.log('Server is up and running on port numner ' + port);
});
