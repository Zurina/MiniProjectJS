var express = require('express');
var blogRouter = express.Router();
var blogFacade = require('../../facades/blogFacade')

/* GET all locationblogs. */
blogRouter.get('/', async function (req, res, next) {
  res.json(await blogFacade.getAllLocationBlogs());
});

// GET specific locationblog
blogRouter.get('/:info', async function (req, res, next) {
    console.log(req.params.info)
  res.json(await blogFacade.getSpecificLocationBlog(req.params.info))
});

// PUT like locaionblog
blogRouter.put('/', async function (req, res, next) {
  res.json(await blogFacade.likeLocationBlog(req.body.username, req.body.info))
});

// POST add locationblog
blogRouter.post('/', async function (req, res, next) {
  res.json(await blogFacade.addLocationBlog(req.body))
});

// DELETE locationblog
blogRouter.post('/delete', async function (req, res, next) {
  res.json(await blogFacade.deleteLocationBlog(req.body.info))
});

module.exports = blogRouter;

