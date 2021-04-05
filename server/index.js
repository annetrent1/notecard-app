const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')

const cors = require('cors')

var db = require('./database')

const ENV = process.env.NODE_ENV
const PORT = process.env.PORT || 5000

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use('/api/stacks', require('./api/stacks'))


// Choose the port and start the server
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}!`)
})

db.query('SELECT NOW()', (err, res) => {
  if (err.error) {
    return console.log(err.error)
  }
  console.log(`Database connected: ${res[0].now}`)
})

module.exports = app;