const db = 'mongodb://apopesc6:apopesc6@ds133920.mlab.com:33920/se3316-popescu-lab3';
const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
//Connect to MongoDB
mongoose
    .connect(db)
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));
    
    
//Body parse middleware
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.get('/', (req,res) =>res.send("Hello World"));

const port = process.env.PORT || 8080;

app.listen(port, () => console.log(`server running on port ${port}`));