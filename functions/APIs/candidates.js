const { db } = require('../utils/admin');
const { response } = require('express');

exports.getAll = (request, response) => {

    db
        .collection('sirius-all')
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

exports.getStandupCan = (request, response) => {

    db
        .collection('sirius-standup')
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

exports.getRetroCan = (request, response) => {

    db
        .collection('sirius-retro')
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

exports.getSprintPlanCan = (request, response) => {

    db
        .collection('sirius-sprint-plan')
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

exports.addNew = (request, response) => {
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

exports.updateCan = (request, response) => {
    if (request.body.name.trim() === '') {
        return response.status(400).json({ name: 'Must not be empty' })
    }

    const updateCandidate = {
        name: request.body.name
    }

    db
        .collection('standup-candidates')
        .add(updateCandidate)
        .then((doc) => {
            const responseUpdateCandidate = updateCandidate;
            responseUpdateCandidate.id = doc.id;
            return response.json(responseUpdateCandidate);
        })
        .catch((err) => {
            response.status(500).json({ error: err });
            console.error(err);
        });
}


exports.deleteCan = (request, response) => {
    const document = db.collection('standup-candidates').doc(request.body.id);
    // return response.body.id;
    document
        .get()
        .then((doc) => {
            if (!doc.exists) {
                return response.status(404).json({ error: "candidate not found"});
            }
            return document.delete();
        })
        .then(() => {
            response.json({ message: 'delete successfully' })
        })
        .catch((err) => {
            console.error(err);
            return response.status(500).json({ error: err.code });
        });
}