const db = require('../database')

class Stacks {
    static retrieveAll (callback) {
        db.query('SELECT name FROM stack;', (err, res) => {
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