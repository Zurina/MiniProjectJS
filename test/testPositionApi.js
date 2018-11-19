var expect = require('chai').expect
var makeTestData = require('./makeTestData')
var nock = require('nock')
var fetch = require('node-fetch')

const n = nock('http://localhost:3000/');

describe(' API USER SCHEMA', async function () {
    var testData;
    before(async () => {
        testData = await makeTestData()
        n.get('/api/positions').reply(200, testData.positions);
        n.get('/api/positions/Immassive1').reply(200, testData.users[0]);
        //n.get('/api/planets/2').reply(200, testPlanet);
    })

    it('get all positions', function (done) {
        fetch('http://localhost:3000/api/positions').then(res => {
            return res.json()
        }).then(users => {
            expect(users.length).to.equal(2)
            done()
        })
    })

    it('will find Immassive1 via position', function (done) {
        fetch('http://localhost:3000/api/positions/Immassive1').then(res => {
            return res.json()
        }).then(user => {
            expect(user.username).to.equal('Immassive1')
            done()
        })
    })
})