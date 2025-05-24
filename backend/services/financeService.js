const yahooFinance = require('yahoo-finance2').default;

const fetchYahooData = async (symbol) => {
  try {
    const quote = await yahooFinance.quote(symbol);
    return {
      cmp: quote.regularMarketPrice,
    };
  } catch (err) {
    console.error(`Error fetching Yahoo data for ${symbol}`, err);
    return { cmp: null };
  }
};

const fetchGoogleData = async (symbol) => {
  // Mock or scraping-based solution
  return {
    peRatio: (Math.random() * 40).toFixed(2),
    latestEarnings: (Math.random() * 100).toFixed(2),
  };
};

module.exports = {
  fetchYahooData,
  fetchGoogleData,
};
