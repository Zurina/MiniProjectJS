var express = require('express');
var apiRouter = express.Router();
var mainRouter = require('./main')
var homePage = require('./homepage')

apiRouter.use('/', homePage)
apiRouter.use('/main', mainRouter)

module.exports = apiRouter