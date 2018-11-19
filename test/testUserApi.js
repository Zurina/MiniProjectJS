var expect = require('chai').expect
var makeTestData = require('./makeTestData')
var nock = require('nock')
var fetch = require('node-fetch')

const n = nock('http://localhost:3000/');

describe(' API USER SCHEMA', async function () {
    var testData;
    before(async () => {
        testData = await makeTestData()
        n.get('/api/users').reply(200, testData.users);
        n.get('/api/users/Immassive1').reply(200, testData.users[0]);
        //n.post('/api/users').reply(200, 'Success, user added!')
        
    })

    it('get all users', function (done) {
        fetch('http://localhost:3000/api/users').then(res => {
            return res.json()
        }).then(users => {
            expect(users.length).to.equal(2)
            done()
        })
    })

    it('will find Immassive1', function (done) {
        fetch('http://localhost:3000/api/users/Immassive1').then(res => {
            return res.json()
        }).then(user => {
            expect(user.username).to.equal('Immassive1')
            done()
        })
    })

})