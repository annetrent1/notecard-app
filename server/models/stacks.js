const db = require('../database')

class Stacks {
    static retrieveAll (callback) {
        db.query('SELECT name FROM stack;', function (err, res) {
            if (err.error) {
                return callback(err)
            }
            callback(res)
        })
    }

    static insert (stack, userid, callback) {
        db.query('INSERT INTO stack (name, userid) VALUES($1, $2);', [stack, userid], function (err, res) {
            if (err.error) {
                return callback(err)
            }
            callback(res)
        })
    }
}

module.exports = Stacks;