var express = require('express')
var Stacks = require('../models/stacks')

var router = express.Router();

router.get('/', function (req, res) {
    Stacks.retrieveAll(function (err, stack) {
        if (err) {
            return res.json(err)
        }
        return res.json(stack)
    })
})

router.post('/', function (req, res) {
    var stack = req.body.stack;
    var userid = req.body.userid;
    Stacks.insert(stacks, userid, function (err, result) {
        if (err) {
            return res.json(err)
        }
        return res.json(result)
    })
})

module.exports = router;