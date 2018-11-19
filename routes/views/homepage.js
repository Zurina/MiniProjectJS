var express = require('express');
var homePageRouter = express.Router();
var loginFacade = require('../../facades/loginFacade')
var blogFacade = require('../../facades/blogFacade')
var userFacade = require('../../facades/userFacade')


/* GET home page. */
homePageRouter.get('/', function(req, res, next) {
  res.render('homepage', { title: 'Friends App' });
});

homePageRouter.post('/login', async function(req, res, next) {
  const {username, password} = req.body
  const response = await loginFacade.loginWeb(username, password)
  response.status == 200 
  ? res.render('main', { username: username, locationblogs: response.blogs })
  : res.render('error', { error: response.msg });
});

homePageRouter.post('/like', async function(req, res, next) {
  console.log('WALLLLLAH')
  const {username, blogID} = req.body
  console.log(username, blogID)
  console.log('WALLLLLAH1')
  const user = await userFacade.findByUserName(username)
  console.log('WALLLLLAH2')
  await blogFacade.likeLocationBlogByID(username, blogID)
  console.log('WALLLLLAH3')
  const locationblogs = await blogFacade.getAllLocationBlogs()
  console.log('WALLLLLAH4')
  console.log(locationblogs)
  res.render('main', { username: username, locationblogs: locationblogs })
});

module.exports = homePageRouter;
