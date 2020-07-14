const express = require("express");
const router = express.Router();
const postController = require('../controllers/post_controller');
const passport = require('passport')

router.post('/create', passport.checkAuthentication, postController.addPost);

module.exports = router;