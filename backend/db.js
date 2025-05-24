// db.js
const mongoose = require('mongoose');

const uri = 'mongodb://localhost:27017/portfolioDB'; // your MongoDB URI

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const stockSchema = new mongoose.Schema({
  symbol: String,
  name: String,
  purchasePrice: Number,
  quantity: Number,
  exchange: String,
  cmp: Number,
  peRatio: Number,
  latestEarnings: String,
  lastUpdated: { type: Date, default: Date.now },
});

const Stock = mongoose.model('Stock', stockSchema);

async function saveOrUpdateStock(stockData) {
  return Stock.findOneAndUpdate(
    { symbol: stockData.symbol },
    { $set: stockData },
    { upsert: true, new: true }
  );
}

async function getAllStocks() {
  return Stock.find({});
}

module.exports = {
  saveOrUpdateStock,
  getAllStocks,
};
