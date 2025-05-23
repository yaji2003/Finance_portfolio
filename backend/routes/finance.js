const express = require('express');
const router = express.Router();
const { fetchYahooData, fetchGoogleFinanceData } = require('../services/financeService');

router.get('/:symbol', async (req, res) => {
  try {
    const symbol = req.params.symbol.toUpperCase();
    const yahooData = await fetchYahooData(symbol);
    const googleData = await fetchGoogleFinanceData(symbol);

    res.json({
      symbol,
      name: yahooData.name,
      cmp: yahooData.cmp,
      peRatio: googleData.peRatio,
      latestEarnings: googleData.latestEarnings,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
