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
    getAll, deleteCandidate
} = require('./APIs/candidates');

app.get('/all', getAll);


const {
    getCandidates
} = require('./APIs/candidates');

app.get('/candidates', getCandidates);

const {
    getRetroCan
} = require('./APIs/candidates');

app.get('/retro', getRetroCan);

const {
    addNew
} = require('./APIs/candidates');

app.post('/new', addNew);


const {
    updateCan
} = require('./APIs/candidates');

app.post('/update-can', updateCan);


const {
    deleteCan
} = require('./APIs/candidates');

app.delete('/delete-can', deleteCan);


const {
    getColors
} = require('./APIs/colors');

app.get('/colors', getColors)

exports.api = functions.https.onRequest(app);
