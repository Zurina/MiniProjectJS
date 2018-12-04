var express = require('express');
var apiRouter = express.Router();
var mainRouter = require('./main')
var homePage = require('./homepage')
var apolloClient = require('./apolloClient')

apiRouter.use('/', homePage)
apiRouter.use('/main', mainRouter)
apiRouter.use('/apolloClient', apolloClient)


module.exports = apiRouter