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
app.use(cors({ origin: true }));


const { getAll } = require('./APIs/candidates');

app.get('/all', getAll);

const { getStandupCan } = require('./APIs/candidates');

app.get('/standup', getStandupCan);

const { getRetroCan } = require('./APIs/candidates');

app.get('/retro', getRetroCan);

const { getSprintPlanCan } = require('./APIs/candidates')

app.get('/sprint-plan', getSprintPlanCan)

const { addNew } = require('./APIs/candidates');

app.post('/new', addNew);

const { addStandupHost } = require('./APIs/candidates');

app.post('/add-standup-host', addStandupHost);

const { updateCan } = require('./APIs/candidates');

app.post('/update-can', updateCan);

const { getColors } = require('./APIs/colors');

app.get('/colors', getColors)

exports.api = functions.https.onRequest(app);
