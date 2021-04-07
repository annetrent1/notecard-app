const db = require('../database')

class Notecards {
    static retrieveByStack (stackid, callback) {
        db.query('SELECT descriptionfront, descriptionback, notecardid FROM notecard WHERE stackid=$1;', [stackid], (err, res) => {
            if (err.error) {
                return callback(err)
            }
            callback(res)
        })
    }

    static insert (stackid, descriptionfront, descriptionback, callback) {
        db.query('INSERT INTO notecard (stackid, descriptionfront, descriptionback) VALUES($1, $2, $3);', 
            [stackid, descriptionfront, descriptionback], function (err, res) {
            if (err.error) {
                return callback(err)
            }
            callback(res)
        })
    }

    static edit (notecardid, descriptionfront, descriptionback, callback) {
        db.query('UPDATE notecard SET descriptionfront=$1, descriptionback=$2 WHERE notecardid=$3;', 
            [descriptionfront, descriptionback, notecardid], function (err, res) {
            if (err.error) {
                return callback(err)
            }
            callback(res)
        })
    }
}

module.exports = Notecards;