const sqlite3 = require('sqlite3').verbose();
const path = require('path')
const dbPath = path.resolve(__dirname, 'usersTransactions.db')

let db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        return console.error("ERROR: " + err.message);
    }
    console.log('Connected to the in-memory SQlite database.');
});

module.exports = {
    sendMoney: function (req, res) {
        let sender = req.body.sender
        let receiver = req.body.receiver
        let amount = req.body.amount
        if (!receiver) {
            res.status(400).send('Invalid reciever!');
            return
        }
        if (!amount) {
            res.status(400).send('Invalid amount!');
            return
        }
        db.run(`CREATE TABLE IF NOT EXISTS userTransactions (
                    sender TEXT NOT NULL,
                    receiver TEXT NOT NULL,
                    amount INTEGER);`, function (err) {
                if (err) {
                    return console.log(err.message);
                }
            });
        db.run(`INSERT INTO userTransactions(sender, receiver, amount) VALUES('${sender}', '${receiver}',${amount})`, function (err) {
            if (err) {
                return console.log(err.message);
            }
        });
        res.send("sent!")
    },

    getBalance: function (req, res) {
        let sender = req.query.sender
        let sumSent = 0, sumReceived = 0
        if (!sender){
            res.status(400).send('Invalid sender name!');
            return
        }
        let query = `SELECT SUM(amount) FROM userTransactions WHERE sender='${sender}'`
        db.all(query, [], (err, response) => {
            if (err) {
                return console.log(err.message);
            }
            if (response[0]['SUM(amount)']) {
                sumSent = response[0]['SUM(amount)']
            }
            query = `SELECT SUM(amount) FROM userTransactions WHERE receiver='${sender}'`
            db.all(query, [], (err, response) => {
                if (err) {
                    return console.log(err.message);
                }
                if (response[0]['SUM(amount)']) {
                    sumReceived = response[0]['SUM(amount)']
                }
                balance = sumReceived - sumSent
                res.send("" + balance)
            });
        });
    },

    getHistory: function (req, res) {
        let sender = req.query.sender
        let query = `SELECT sender, receiver, amount FROM userTransactions WHERE sender='${sender}' OR receiver='${sender}'`
        db.all(query, [], (err, response) => {
            if (err) {
                return console.log(err.message);
            }
            res.send(response)
        });
    }
};