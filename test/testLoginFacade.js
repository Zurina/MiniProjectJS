var expect = require('chai').expect
var loginFacade = require('../facades/loginFacade')
var makeFriends = require('./makeFriends')

describe('Testing Login, and finding nearby players', async function () {

    before(async () => {
        this.timeout(5000)
        await makeFriends()
    })

    it('will find Gizmaker and Smart within 500 meters',  async function() {
        const data = await loginFacade.login('ChosenOne', 'HÆHÆ', 12.568101882934569, 55.70153288107985, 500)
        const friends = data.friends
        expect(friends.length).to.equal(3) // Including himself - fix this
        expect(friends.some(p => p.username === 'Gizmaker')).to.be.true
        expect(friends.some(p => p.username === 'Smart')).to.be.true
    })

    it('will find Gizmaker, Smart and Genius within 1000 meters', async function() {
        const data = await loginFacade.login('ChosenOne', 'HÆHÆ', 12.568101882934569, 55.70153288107985, 1000)
        const friends = data.friends
        expect(friends.length).to.equal(4) // Including himself - fix this
        expect(friends.some(p => p.username === 'Gizmaker')).to.be.true
        expect(friends.some(p => p.username === 'Smart')).to.be.true
        expect(friends.some(p => p.username === 'Genius')).to.be.true
    })

    it('will find Gizmaker, Smart, Genius and Wearwolf within 2000 meters', async function() {
        const data = await loginFacade.login('ChosenOne', 'HÆHÆ', 12.568101882934569, 55.70153288107985, 2000)
        const friends = data.friends
        expect(friends.length).to.equal(5) // Including himself - fix this
        expect(friends.some(p => p.username === 'Gizmaker')).to.be.true
        expect(friends.some(p => p.username === 'Smart')).to.be.true
        expect(friends.some(p => p.username === 'Genius')).to.be.true
        expect(friends.some(p => p.username === 'Wearwolf')).to.be.true
    })

    it('will find Gizmaker, Smart, Genius, Wearwolf and Dog within 3000 meters', async function() {
        const data = await loginFacade.login('ChosenOne', 'HÆHÆ', 12.568101882934569, 55.70153288107985, 3000)
        const friends = data.friends
        expect(friends.length).to.equal(6) // Including himself - fix this
        expect(friends.some(p => p.username === 'Gizmaker')).to.be.true
        expect(friends.some(p => p.username === 'Smart')).to.be.true
        expect(friends.some(p => p.username === 'Genius')).to.be.true
        expect(friends.some(p => p.username === 'Wearwolf')).to.be.true
        expect(friends.some(p => p.username === 'Dog')).to.be.true
    })
})