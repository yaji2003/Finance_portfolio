const express = require('express');
const router = express.Router();
const { fetchYahooData } = require('../services/yahooService');

router.get('/:symbol', async (req, res) => {
  try {
    const data = await fetchYahooData(req.params.symbol);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
