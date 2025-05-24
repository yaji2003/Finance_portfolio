const { fetchYahooData, fetchGoogleData } = require('../services/financeService');

const getPortfolioData = async (req, res) => {
  const portfolio = req.body.portfolio;

  console.log('Incoming portfolio:', portfolio); // Debug incoming data

  try {
    const enrichedPortfolio = await Promise.all(
      portfolio.map(async (stock) => {
        const yahoo = await fetchYahooData(stock.symbol);
        const google = await fetchGoogleData(stock.symbol);

        // Use purchasePrice from frontend, default 0 if missing
        const purchasePrice = stock.purchasePrice ?? 0;

        const presentValue = yahoo.cmp * stock.qty;
        const investment = purchasePrice * stock.qty;
        const gainLoss = presentValue - investment;

        // Log for debugging
        console.log(`Symbol: ${stock.symbol}, Purchase Price: ${purchasePrice}, CMP: ${yahoo.cmp}`);
        console.log(`Investment: ${investment}, Present Value: ${presentValue}, Gain/Loss: ${gainLoss}`);

        return {
          ...stock,
          purchasePrice: Number(purchasePrice.toFixed(2)),
          cmp: Number(yahoo.cmp.toFixed(2)),
          presentValue: Number(presentValue.toFixed(2)),
          gainLoss: Number(gainLoss.toFixed(2)),
          peRatio: Number(google.peRatio),
          latestEarnings: Number(google.latestEarnings),
        };
      })
    );

    res.json({ portfolio: enrichedPortfolio });
  } catch (err) {
    console.error('Failed to fetch portfolio data:', err);
    res.status(500).json({ error: 'Failed to fetch portfolio data' });
  }
};

module.exports = {
  getPortfolioData,
};
