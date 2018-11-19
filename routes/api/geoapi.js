var express = require('express');
var geoapiRouter = express.Router();
var geojson = require('../../utils/geojson')
var positionFacade = require('../../facades/positionFacade')
var gameArea = require('../../game/gameArea').gameArea

geoapiRouter.get('/isuserinarea/:lon/:lat', (req, res) => { // TODO FIX
    geojson.isUserInArea(req.params.lon, req.params.lat)
    ? res.json({status: true, msg: "Point was inside the tested polygon"}) 
    : res.json({status: false, msg: "Point was NOT inside the tested polygon"})

})

geoapiRouter.get('/distancetouser/:lon/:lat/:username', async (req, res) => {
    var user = await positionFacade.findPosition(req.params.username)
    res.json(geojson.findDistanceToUser(req.params.lon, req.params.lat, user.loc))
})

geoapiRouter.get('/allowedarea', async (req, res) => {
    res.json(gameArea)
})

geoapiRouter.get('/findNearbyFriends/:lon/:lat/:distance', async (req, res) => {
    var positions = await positionFacade.findAllPositions()
    res.json(await geojson.findNearbyPlayers(req.params.lon, req.params.lat, req.params.distance, positions))
})



module.exports = geoapiRouter