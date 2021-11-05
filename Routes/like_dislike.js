var express = require('express');
var router = express.Router();
const controller = require('../controllers/like_dislike')
const { AuthenticateToken } = require('../auth/jwt')

// Post LikeDislike
router.post('/createLikeDislikes', AuthenticateToken, controller.createLikeDislike);
// Gat LikeDislike
router.get('/getLikeDislikeDataById/:id', AuthenticateToken, controller.getLikeDislikeDataById);
// Gat All LikeDislikes
router.get('/getLikeDislikeDatas', AuthenticateToken, controller.getLikeDislikeDatas);
// Put LikeDislike
router.put('/updateLikeDislike/:id', AuthenticateToken, controller.updateLikeDislikes);
// Delete LikeDislike
router.delete('/deleteLikeDislike/:id', AuthenticateToken, controller.deleteLikeDislike);

module.exports = router;