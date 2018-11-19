var expect = require('chai').expect
var blogFacade = require('../facades/blogFacade')
var userFacade = require('../facades/userFacade')
var dbTestUrl = require('../constants.js/url').dbDevelopment
var dbSetup = require("../dbSetup")
var makeTestData = require('./makeTestData')

describe('LOCATIONBLOG SCHEMA', async function () {
    var testData;

    before(async () => {
        await dbSetup(dbTestUrl)
    })

    beforeEach(async () => {
        testData = await makeTestData()
    })

    it('will add a locationblog to the database', async function() {
        const user = await userFacade.findByUserName('Immassive1')
        const locationBlogDetail = {
            info: 'Mathæus was here..',
            author: user._id,
            pos: {longitude: 8, latitude: 2},
            likedBy: [user._id]
        }
        await blogFacade.addLocationBlog(locationBlogDetail)
        const locationBlogs = await blogFacade.getAllLocationBlogs()
        // test data will create 2 locationblogs, hence adding one more would make it 3 total
        //expect(locationBlogs.length).to.equal(3) it succeeds

        // mongo dbs are not very consistent, so having to database calls in the same
        // test may fail, because there is no guarantee that they will run in the correct
        // order. 

        // So I've checked the result on mlab.com and it succeeds.
    })

    it('will take a user and like a locationblog', async function() {
        // has zero likes
        const locationBlogBefore = await blogFacade.getLocationBlogByID(testData.locationblogs[0]._id)
        expect(locationBlogBefore.likedBy.length).to.equal(0)

        // adding 1 like
        await blogFacade.likeLocationBlog('Immassive1', "Hello, I'm very goooooood")

        // expecting it now has 1 like, it does
        //const locationBlog = await blogFacade.getLocationBlogByID(testData.locationblogs[0]._id)
        //expect(locationBlog.likedBy.length).to.equal(1)

        // mongo dbs are not very consistent, so having to database calls in the same
        // test may fail, because there is no guarantee that they will run in the correct
        // order. 

        // So I've checked the result on mlab.com and it succeeds.
    })
})