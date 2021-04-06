const db = require('../database')

class User {
    static getUser (email, password, callback) {
        db.query('SELECT userid FROM public.user WHERE email=$1 AND password=$2;', [email,password], (err, res) => {
            if (err.error) {
                return callback(err)
            }
            callback(res)
        })
    }

    static insert (email, password, callback) {
        db.query('INSERT INTO public.user (email, password) VALUES($1, $2);', 
            [email, password], function (err, res) {
            if (err.error) {
                return callback(err)
            }
            callback(res)
        })
    }
}

module.exports = User;