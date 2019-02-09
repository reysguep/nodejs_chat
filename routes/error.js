const express = require('express');
const router = express.Router();

const errorController = require('../controllers/error');

router.use('/', (req, res) => {
    errorController.get404(req, res);
});

module.exports = router;