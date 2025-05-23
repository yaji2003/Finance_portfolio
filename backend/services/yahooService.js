const yahooFinance = require('yahoo-finance2').default;

async function fetchYahooData(symbol) {
  const quote = await yahooFinance.quote(symbol);
  return {
    cmp: quote.regularMarketPrice,
    name: quote.shortName,
  };
}

module.exports = { fetchYahooData };
