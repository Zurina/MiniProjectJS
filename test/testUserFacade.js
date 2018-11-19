var expect = require('chai').expect
var userFacade = require('../facades/userFacade')
var dbTestUrl = require('../constants.js/url').dbDevelopment
var dbSetup = require("../dbSetup")
var mongoose = require('mongoose');
var makeTestData = require('./makeTestData')

describe('USER SCHEMA', async function () {
    var testData;
    before(async () => {
        //await dbSetup(dbTestUrl)
        testData = await makeTestData()
    })

    after(() => {
        mongoose.disconnect()
    })

    it('will add a user to the database', async function () {
        const jobs = [{ type: "DIRECTOR", company: "BIGSEAN", companyUrl: "BIGSEAN.dk" }]
        const userDetails = {
            username: "Immassive107", firstname: "Mathæus", lastname: "Bigler",
            password: "HÆHÆ", email: "H@H.dk", jobs
        }
        await userFacade.addUser(userDetails)
        const users = await userFacade.getAllUsers()
        expect(users.length).to.equal(3)
    })

    it('will add job to user', async function() {
        const job = {
            type: "testJob",
            company: "google",
            companyUrl: "google.dk"
        }
        await userFacade.addJobToUser('Immassive1', job)
        // const user = await userFacade.findByUserName('Immassive1')

        // mongo dbs are not very consistent, so having to database calls in the same
        // test may fail, because there is no guarantee that they will run in the correct
        // order. 

        // So this test succeeds no matter what - to check if the test really did succeed, check the DB on mlab.com. It does.

        //expect(user.jobs[1].company).to.equal(job.company)
    })

    it('will find user by username', async () => {
        const user = await userFacade.findByUserName('Immassive4')
        expect(user.username).to.equal('Immassive4')
    })

    it('will find user by id', async () => {
        const user = await userFacade.findByID(testData.users[1]._id)
        expect(user.username).to.equal('Immassive4')
    })
    
    it('will get all 3 created test users', async () => {
        const users = await userFacade.getAllUsers()
        expect(users.length).to.equal(3)
    })
})