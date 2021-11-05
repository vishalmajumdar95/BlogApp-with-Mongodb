var express = require('express');
var router = express.Router();
const controller = require('../controllers/blog')
const { AuthenticateToken } = require('../auth/jwt')

// Post Blog
router.post('/createBlogs', AuthenticateToken, controller.createBlogs);
// Gat Blog
router.get('/getBlogDataById/:id', AuthenticateToken, controller.getBlogDataById);
// Gat All Blogs
router.get('/getBlogDatas', AuthenticateToken, controller.getBlogDatas);
// Put Blog
router.put('/updateBlogs/:id', AuthenticateToken, controller.updateBlogs);
// Delete Blog
router.delete('/deleteBlogs/:id', AuthenticateToken, controller.deleteBlog);

module.exports = router;