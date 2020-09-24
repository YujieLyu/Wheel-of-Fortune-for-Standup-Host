const { db } = require('../utils/admin');
const { response, request } = require('express');

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
                    name: ele.data().name,
                    mode: ele.data().mode
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
                    name: ele.data().name,
                    mode: ele.data().mode
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
                    name: ele.data().name,
                    mode: ele.data().mode
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
        .collection('sirius-sprintplan')
        .orderBy('name', 'asc')
        .get()
        .then((data) => {
            let candidates = [];
            data.forEach(ele => {
                candidates.push({
                    id: ele.id,
                    name: ele.data().name,
                    mode: ele.data().mode
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

    add(request, response, 'sirius-all', 'all');
}

exports.addNewStandupCan = (request, response) => {

    add(request, response, 'sirius-standup', 'standup');

}

exports.addStandupHost = (request, response) => {
    // if (request.body.name.trim() === '') {
    //     return response.status(400).json({ name: 'Must not be empty' })
    // }

    // const newHost = {
    //     name: request.body.name,
    //     time: new Date()
    // }
    add(request, response, 'sirius-standup-hosts', 'standup-host');

    // db
    //     .collection('sirius-standup-hosts')
    //     .add(newHost)
    //     .then((doc) => {
    //         const responseNewHost = newHost;
    //         responseNewHost.id = doc.id;
    //         return response.json(responseNewHost);
    //     })
    //     .catch((err) => {
    //         response.status(500).json({ error: err });
    //         console.error(err);
    //     });
}

exports.updateCan = (request, response) => {
    if (request.body.name.trim() === '') {
        return response.status(400).json({ name: 'Must not be empty' })
    }

    const updateCandidate = {
        name: request.body.name,
        mode: request.body.mode
    }

    switch (request.body.mode) {
        case "standup":
            db
                .collection('sirius-standup')
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
            break;
        case "retro":
            db
                .collection('sirius-retro')
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
            break;
        case "plan":
            db
                .collection('sirius-sprintplan')
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
            break;
        default:
            response.json({ message: 'cannot get the mode' })
    }

}

exports.deleteStandupCan = (request, response) => {
    const document = db.doc(`/sirius-standup/${request.params.id}`);
    document
        .get()
        .then(doc => {
            if (!doc.exists) {
                return response.status(404).json({ error: 'candidate not found' })
            }
            document.delete();
        })
        .then(() => {
            response.json({ message: 'Delete successfully' })
        })
        .catch(err => {
            console.log(err);
            return response.status(500).json({ err: err.code });
        })
}

const add = (request, response, collection, mode) => {
    if (request.body.name.trim() === '') {
        return response.status(400).json({ name: 'Must not be empty' })
    }
    const newCandidate = {
        name: request.body.name,
        mode: mode,
        time: new Date()
    }
    db
        .collection(collection)
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