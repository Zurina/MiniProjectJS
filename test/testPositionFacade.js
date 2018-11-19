var expect = require('chai').expect
var positionFacade = require('../facades/positionFacade')
var dbTestUrl = require('../constants.js/url').dbDevelopment
var dbSetup = require("../dbSetup")
var makeTestData = require('./makeTestData')

describe('POSITION SCHEMA', async function () {
    var testData;
    this.beforeEach(async () => {
        //await dbSetup(dbTestUrl)
        testData = await makeTestData()
    })

    it('will find a users position', async function() {
        const position = await positionFacade.findPosition('Immassive1')
        expect(position.loc.coordinates.toString()).to.equal(testData.positions[0].loc.coordinates.toString()) // doesnt work with array comparison (has to convert to string)
    })

    it('will find delete a position', async function() {
        // containing 5 positions by default from test data
        await positionFacade.deletePosition(testData.users[1].username)
        const positions = await positionFacade.findAllPositions()
        expect(positions.length).to.equal(1)
    })

    it('will update a users position and find it again', async function() {
        await positionFacade.updatePosition('Immassive1', [66, 55])
        const position = await positionFacade.findPosition('Immassive1')
        expect(position.loc.coordinates.toString()).to.equal('66,55')
    })

    it('will add a position', async function() {
        var posDetail = { 
            user : testData.users[1]._id,
            loc:{
                coordinates:[24,26] 
            },
            created: "2022-09-25T20:40:21.899Z"
        };
        await positionFacade.addPosition(posDetail)
        const positions = await positionFacade.findAllPositions()
        expect(positions.length).to.equal(2)
    })

    it('will get all positions', async function() {
        const positions = await positionFacade.findAllPositions()
        expect(positions.length).to.equal(2)
    })

})