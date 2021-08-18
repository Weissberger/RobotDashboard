const express = require('express');
const router = express.Router();
const missionController = require('../controllers/missionController.js');

router.post('/store-mission', missionController.storeMission)
router.get('/email-missions', missionController.emailMissions)

module.exports = router;
