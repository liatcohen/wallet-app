const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000
const functions = require('./routes/serverFunctions')

var cors = require('cors')

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.post('/send', functions.sendMoney);
app.get('/balance', (req, res) => functions.getBalance(req, res));
app.get('/history', (req, res) => functions.getHistory(req, res));

app.listen(port, () => console.log(`Example app listening on port ${port}!`))


