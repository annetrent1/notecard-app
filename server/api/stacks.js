var express = require('express')
var Stacks = require('../models/stacks')

var router = express.Router();

router.get('/', (req, res) => {
    Stacks.retrieveAll((err, stack) => {
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