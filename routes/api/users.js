var express = require('express');
var userRouter = express.Router();
var userFacade = require('../../facades/userFacade')

/* GET users listing. */
userRouter.get('/', async function (req, res, next) {
  res.json(await userFacade.getAllUsers());
});

// GET specific user
userRouter.get('/:username', async function (req, res, next) {
  res.json(await userFacade.findByUserName(req.params.username));
});

userRouter.put('/', async function (req, res, next) {
  res.json(await userFacade.addJobToUser(req.body.username, req.body.jobs[0]))
});

// POST add user
userRouter.post('/', async function (req, res, next) {
  res.json(await userFacade.addUser(req.body))
});

// DELETE user
userRouter.post('/delete', async function (req, res, next) {
  res.json(await userFacade.deleteUser(req.body))
});

module.exports = userRouter;

