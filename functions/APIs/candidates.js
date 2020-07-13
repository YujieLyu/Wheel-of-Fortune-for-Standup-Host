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
                    name: ele.data().name,
                    mode:ele.data().mode
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
        .collection('sirius-sprint-plan')
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
    if (request.body.name.trim() === '') {
        return response.status(400).json({ name: 'Must not be empty' })
    }

    const newCandidate = {
        name: request.body.name
    }

    db
        .collection('sirius-all')
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

exports.addStandupHost = (request, response) => {
    if (request.body.name.trim() === '') {
        return response.status(400).json({ name: 'Must not be empty' })
    }

    const newHost = {
        name: request.body.name
    }

    db
        .collection('sirius-standup-hosts')
        .add(newHost)
        .then((doc) => {
            const responseNewHost = newHost;
            responseNewHost.id = doc.id;
            return response.json(responseNewHost);
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
        case "sprint-plan":
            db
                .collection('sirius-sprint-plan')
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
    }

}


exports.deleteCan = (request, response) => {

    const document = null;

    switch (request.body.mode) {
        case "all":
            document = db.collection('sirius-all').doc(request.body.id);
            break;
        case "standup":
            document = db.collection('sirius-standup').doc(request.body.id);
            break;
        case "retro":
            document = db.collection('sirius-retro').doc(request.body.id);
            break;
        case "sprint-plan":
            document = db.collection('sirius-sprint-plan').doc(request.body.id);
            break;
    }

    document
        .get()
        .then((doc) => {
            if (!doc.exists) {
                return response.status(404).json({ error: "candidate not found" });
            }
            return document.delete();
        })
        .then(() => {
            response.json({ message: 'delete successfully' })
        })
        .catch((err) => {
            console.error(err);
            return response.status(500).json({ error: err.code, id:request.body.id });
        });
}

// exports.deleteStandupCan = (request, response) => {
//     const document = db.collection('sirius-standup').doc(request.body.id);
//     // return response.body.id;
//     document
//         .get()
//         .then((doc) => {
//             if (!doc.exists) {
//                 return response.status(404).json({ error: "candidate not found" });
//             }
//             return document.delete();
//         })
//         .then(() => {
//             response.json({ message: 'delete successfully' })
//         })
//         .catch((err) => {
//             console.error(err);
//             return response.status(500).json({ error: err.code });
//         });
// }

// exports.deleteRetroCan = (request, response) => {
//     const document = db.collection('sirius-retro').doc(request.body.id);
//     // return response.body.id;
//     document
//         .get()
//         .then((doc) => {
//             if (!doc.exists) {
//                 return response.status(404).json({ error: "candidate not found" });
//             }
//             return document.delete();
//         })
//         .then(() => {
//             response.json({ message: 'delete successfully' })
//         })
//         .catch((err) => {
//             console.error(err);
//             return response.status(500).json({ error: err.code });
//         });
// }

// exports.deleteSprintPlanCan = (request, response) => {
//     const document = db.collection('sirius-sprint-plan').doc(request.body.id);
//     // return response.body.id;
//     document
//         .get()
//         .then((doc) => {
//             if (!doc.exists) {
//                 return response.status(404).json({ error: "candidate not found" });
//             }
//             return document.delete();
//         })
//         .then(() => {
//             response.json({ message: 'delete successfully' })
//         })
//         .catch((err) => {
//             console.error(err);
//             return response.status(500).json({ error: err.code });
//         });
// }