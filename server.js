const db = 'mongodb://apopesc6:apopesc6@ds133920.mlab.com:33920/se3316-popescu-lab3';
const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');

const items = require('./items');

const app = express();

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, PUT, DELETE, GET, OPTIONS');
    res.setHeader('Access-Control-Request-Method', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    next();
});

//Connect to MongoDB
mongoose
    .connect(db)
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));
    
    
//Body parse middleware
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use('/api/items', items);

const port = process.env.PORT || 8080;

app.listen(port, () => console.log(`server running on port ${port}`));