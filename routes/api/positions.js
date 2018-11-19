var express = require('express');
var positionRouter = express.Router();
var positionFacade = require('../../facades/positionFacade')

/* GET all positions. */
positionRouter.get('/', async function (req, res, next) {
  res.json(await positionFacade.findAllPositions());
});

// GET specific position
positionRouter.get('/:username', async function (req, res, next) {
  res.json(await positionFacade.findPosition(username));
});

positionRouter.post('/update', async function (req, res, next) {
  console.log(req.body)
  res.json(await positionFacade.updatePosition(req.body.username, req.body.coordinates))
});

// POST add user
positionRouter.post('/', async function (req, res, next) {
  res.json(await positionFacade.addPosition(req.body))
});

// DELETE user
positionRouter.post('/delete', async function (req, res, next) {
  res.json(await positionFacade.deletePosition(req.body.username))
});

module.exports = positionRouter;

