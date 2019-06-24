const expect = require('chai').expect;
const { sendMoney } = require('../../routes/serverFunctions');
const { getBalance } = require('../../routes/serverFunctions');
const { getHistory } = require('../../routes/serverFunctions');

let req = {
    body: {},
};

let res = {
    sendCalledWith: '',
    code: '',
    send: function(arg) { 
        this.sendCalledWith = arg;
    },
    status: function(code) {
        this.code = code
        return this
    }
};

describe('serverFunctions Route', function() {
    
    describe('sendMoney() function', function() {
        it('Should error out if no receiver name provided ', function() {
            req.body= { sender: 'user', receiver: '', amount:'400' };
            sendMoney(req, res);
            expect(res.code).to.eq(400);
            expect(res.sendCalledWith).to.eq('Invalid reciever!');
        });

        it('Should error out if no amount of money provided ', function() {
            req.body= { sender: 'user1', receiver: 'user2', amount: undefined };
            sendMoney(req, res);
            expect(res.code).to.eq(400);
            expect(res.sendCalledWith).to.eq('Invalid amount!');
        });

        it('Should return successfully if everything is good ', function() {
            req.body= { sender: 'user', receiver: 'rotem', amount: '780' };
            sendMoney(req, res);
            expect(res.sendCalledWith).to.eq('sent!');
        });
    })
    req.body={}


    describe('getBalance() function', function() {
        it('Should error out if no name provided ', function() {
            req.query= { sender: '' };
            getBalance(req, res);
            expect(res.code).to.eq(400);
            expect(res.sendCalledWith).to.eq('Invalid sender name!');
        });
    })

    describe('getHistory() function', function() {
        it('Should error out if no name provided ', function() {
            req.query= { sender: '' };
            getHistory(req, res);
            expect(res.code).to.eq(400);
            expect(res.sendCalledWith).to.eq('Invalid sender name!');
        });
    })
 
});
