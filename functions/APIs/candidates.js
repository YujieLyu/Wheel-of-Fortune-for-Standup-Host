const { db } = require('../utils/admin');
const { response } = require('express');

exports.getAll = (request, response) => {

    db
        .collection('standup-sirius')
        .orderBy('name', 'asc')
        .get()
        .then((data) => {
            let allCandidates = [];
            data.forEach(ele => {
                allCandidates.push({
                    id: ele.id,
                    name: ele.data().name
                });
            });
            return response.json(allCandidates);
        })
        .catch(err => {
            console.error(err);
            return response.status(500).json({ error: err.code });
        })
}

exports.getCandidates = (request, response) => {

    db
        .collection('standup-candidates')
        .orderBy('name', 'asc')
        .get()
        .then((data) => {
            let candidates = [];
            data.forEach(ele => {
                candidates.push({
                    id: ele.id,
                    name: ele.data().name
                });
            });
            return response.json(candidates);
        })
        .catch(err => {
            console.error(err);
            return response.status(500).json({ error: err.code });
        })
}


exports.addCandidate = (request, response) => {
    if (request.body.name.trim() === '') {
        return response.status(400).json({ name: 'Must not be empty' })
    }

    const newCandidate = {
        name: request.body.name
    }

    db
        .collection('standup-sirius')
        .add(newCandidate)
        .then((doc) => {
            const responseNewCandidate = newCandidate;
            responseNewCandidate.id = doc.id;
            return response.json(responseNewCandidate);
        })
        .catch((err) => {
            response.status(500).json({ error: err });
            console.error(err);
        });
}