const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

const app = require('express')();

const { response } = require('express');

//without cors, frontend can't retreive data
const cors = require('cors');
app.use(cors());

const {
    getAll
} = require('./APIs/candidates');

app.get('/all', getAll);

const {
    getCandidates
} = require('./APIs/candidates');

app.get('/candidates', getCandidates);

const {
    addCandidate
} = require('./APIs/candidates');

app.post('/new', addCandidate);

exports.api = functions.https.onRequest(app);
