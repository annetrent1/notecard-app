const db = require('../database')

class Stacks {
    static retrieveAll (userid, callback) {
        db.query('SELECT name, stackid FROM stack WHERE userid=$1;', [userid], (err, res) => {
            if (err.error) {
                return callback(err)
            }
            callback(res)
        })
    }

    static insert (userid, stack, callback) {
        db.query('INSERT INTO stack (userid, name) VALUES($1, $2);', [userid, stack], function (err, res) {
            if (err.error) {
                return callback(err)
            }
            callback(res)
        })
    }
}

module.exports = Stacks;