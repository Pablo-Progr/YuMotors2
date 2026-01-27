const express = require('express');
const router = express.Router();
const { getRegistros } = require('../controllers/RegPosventaUser.controller');

router.get('/:id', getRegistros);

module.exports = router;