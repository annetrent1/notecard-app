var express = require('express')
var User = require('../models/user')

var router = express.Router();

router.get('/:email/:password', (req, res) => {
    var email = req.params.email;
    var password = req.params.password;
    User.getUser(email, password, (err, user) => {
        if (err) {
            return res.json(err)
        }
        return res.json(user)
    })
})

router.post('/', (req, res) => {
    var email = req.body.email;
    var password = req.body.password;
    Notecards.insert(email, password, (err, result) => {
        if (err) {
            return res.json(err)
        }
        return res.json(result)
    })
})

module.exports = router;