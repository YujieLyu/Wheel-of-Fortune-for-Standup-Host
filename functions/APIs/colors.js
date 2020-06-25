const { db } = require('../utils/admin');
const { response } = require('express');

exports.getColors = (request, response) => {
    db
        .collection('colors')
        .orderBy('colorID', 'asc')
        .get()
        .then((data) => {
            let colors = [];
            data.forEach(ele => {
                colors.push({
                    id: ele.data().colorID,
                    hex: ele.data().hex
                });
            });
            return response.json(colors)
        })
        .catch(err => {
            console.error(err);
            return response.status(500).json({ error: err.code });
        })
}