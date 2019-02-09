const express = require('express');

const router = express.Router();

const adminController = require('../controllers/admin');

router.get('/clearPublic', adminController.clearPublicChat);

router.get('/clearPrivate', adminController.clearPublicChat);

router.get('/messages', adminController.getMessages);

router.post('/messages/delete', adminController.removeMessage);

router.post('/messages/edit', adminController.editMessage);

router.get('/table', adminController.getMsgTable);

router.get('/users', adminController.getUsersAdmin);

router.get('/users/add-user', adminController.getAddUser);
router.post('/users/add-user', adminController.postAddUser);

router.get('/users/edit/:username', adminController.getEditUser);
router.post('/users/edit/:username', adminController.postEditUser);

router.get('/', adminController.getAdmin);

module.exports = router;