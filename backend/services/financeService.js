const fetch = require('node-fetch');
const cheerio = require('cheerio');

async function fetchYahooData(symbol) {
  const url = `https://query1.finance.yahoo.com/v7/finance/quote?symbols=${symbol}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Yahoo fetch failed');
  const json = await res.json();
  const quote = json.quoteResponse.result[0];
  if (!quote) throw new Error('Symbol not found on Yahoo');
  return {
    cmp: quote.regularMarketPrice,
    name: quote.shortName,
  };
}

// Google Finance scraping example to get P/E and earnings
async function fetchGoogleFinanceData(symbol) {
  const url = `https://www.google.com/finance/quote/${symbol}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Google Finance fetch failed');
  const html = await res.text();
  const $ = cheerio.load(html);

  // Example selectors (need to inspect the Google Finance page for correct selectors)
  // NOTE: Google Finance HTML structure changes often and scraping may break anytime.

  // Find P/E ratio - look for the element containing 'P/E ratio' label and get its value
  let peRatio = null;
  $('div').each((i, el) => {
    const text = $(el).text();
    if (text.includes('P/E ratio')) {
      peRatio = $(el).next().text().trim();
    }
  });

  // Find latest earnings (example, might need adjustment)
  let latestEarnings = null;
  // This part depends on actual HTML layout, might need custom logic
  
  return {
    peRatio,
    latestEarnings,
  };
}

module.exports = { fetchYahooData, fetchGoogleFinanceData };
