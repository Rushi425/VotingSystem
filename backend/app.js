const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


const AdminRoute = require('./routes/admin.route');
const VoterRoute = require('./routes/vote.route');


mongoose.connect("mongodb+srv://Rushi:Rushi123@votingsystem.pinut.mongodb.net/?retryWrites=true&w=majority&appName=VotingSystem")
    .then(() => {
        console.log("Successfully connected to DB");
    })
    .catch((err) => {
        console.error("Error while connecting to DB:", err);
    });


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/admin', AdminRoute);
app.use('/vote', VoterRoute);


app.get('*', (req, res) => {
    res.status(404).json({
        msg: "Not found"
    });
});

module.exports = app;
