var express = require('express')
var Notecards = require('../models/notecards')

var router = express.Router();

router.get('/:stackid', (req, res) => {
    var stackid = req.params.stackid;
    Notecards.retrieveByStack(stackid, (err, notecard) => {
        if (err) {
            return res.json(err)
        }
        return res.json(notecard)
    })
})

router.post('/', (req, res) => {
    var stackid = req.body.stackid;
    var descriptionfront = req.body.descriptionfront;
    var descriptionback = req.body.descriptionback;
    Notecards.insert(stackid, descriptionfront, descriptionback, (err, result) => {
        if (err) {
            return res.json(err)
        }
        return res.json(result)
    })
})

router.post('/edit', (req, res) => {
    var notecardid = req.body.notecardid;
    var descriptionfront = req.body.descriptionfront;
    var descriptionback = req.body.descriptionback;

    Notecards.edit(notecardid, descriptionfront, descriptionback, (err, result) => {
        if (err) {
            return res.json(err)
        }
        return res.json(result)
    })
})

module.exports = router;