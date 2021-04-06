var express = require('express')
var Stacks = require('../models/stacks')

var router = express.Router();

router.get('/:userid', (req, res) => {
    var userid = req.params.userid;
    Stacks.retrieveAll(userid, (err, stack) => {
        if (err) {
            return res.json(err)
        }
        return res.json(stack)
    })
})

router.post('/', (req, res) => {
    var userid = req.body.userid;
    var stack = req.body.stack;
    Stacks.insert(userid, stack, (err, result) => {
        if (err) {
            return res.json(err)
        }
        return res.json(result)
    })
})

module.exports = router;