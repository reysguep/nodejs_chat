const express = require('express');
const router = express.Router();

const chatsController = require('../controllers/chat');


router.get('/private', chatsController.getPrivateChat);

router.post('/', chatsController.postOpenChat);

router.get('/', chatsController.getOpenChat);

router.get('/messages', chatsController.getMessages);

module.exports = router;