const express = require('express');
const router = express.Router();
const missionController = require('../controllers/missionController.js');

router.post('/store_mission', missionController.login)
router.get('/email_missions', missionController.register)

module.exports = router;
