var expect = require('chai').expect
var makeTestData = require('./makeTestData')
var nock = require('nock')
var fetch = require('node-fetch')

const n = nock('http://localhost:3000/');

describe(' API USER SCHEMA', async function () {
    var testData;
    before(async () => {
        testData = await makeTestData()
        n.get('/api/locationblogs').reply(200, testData.locationblogs);
        n.get("/api/locationblogs/Hello,%20I%27m%20very%20goooooood").reply(200, testData.locationblogs[0]);
    })

    it('get all locationblogs', function (done) {
        fetch('http://localhost:3000/api/locationblogs').then(res => {
            return res.json()
        }).then(locationblogs => {
            expect(locationblogs.length).to.equal(2)
            done()
        })
    })

    it("will find 'Hello, I'm very goooooood' locationblog", function (done) {
        fetch("http://localhost:3000/api/locationblogs/Hello, I'm very goooooood").then(res => {
            return res.json()
        }).then(locationblog => {
            expect(locationblog.info).to.equal("Hello, I'm very goooooood")
            done()
        })
    })
})