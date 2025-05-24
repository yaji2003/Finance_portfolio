const express = require('express');
const router = express.Router();
const { getPortfolioData } = require('../controllers/portfolioController');

router.post('/portfolio', getPortfolioData);

module.exports = router;
