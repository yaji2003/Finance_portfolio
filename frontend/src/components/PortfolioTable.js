import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PortfolioTable = () => {
  // IMPORTANT: Make sure purchasePrice is correctly set here
  const [portfolio, setPortfolio] = useState([
    { symbol: 'AAPL', purchasePrice: 140, qty: 10 },
    { symbol: 'GOOGL', purchasePrice: 2700, qty: 5 },
  ]);

  const [data, setData] = useState([]);

  const fetchPortfolio = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/portfolio', { portfolio });
      setData(res.data.portfolio);
    } catch (err) {
      console.error('Error fetching portfolio:', err);
    }
  };

  useEffect(() => {
    fetchPortfolio();
    const interval = setInterval(fetchPortfolio, 15000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Dynamic Portfolio Dashboard</h2>
      <table className="table table-bordered table-striped text-center">
        <thead className="table-dark">
          <tr>
            <th>Symbol</th>
            <th>Purchase Price</th>
            <th>Qty</th>
            <th>Investment</th>
            <th>CMP</th>
            <th>Present Value</th>
            <th>Gain/Loss</th>
            <th>P/E Ratio</th>
            <th>Latest Earnings</th>
          </tr>
        </thead>
        <tbody>
          {data.map((stock, index) => {
            const investment = stock.purchasePrice * stock.qty;
            const gainLossStyle = stock.gainLoss >= 0 ? 'text-success' : 'text-danger';

            return (
              <tr key={index}>
                <td>{stock.symbol}</td>
                <td>{stock.purchasePrice.toFixed(2)}</td>
                <td>{stock.qty}</td>
                <td>{investment.toFixed(2)}</td>
                <td>{stock.cmp}</td>
                <td>{stock.presentValue.toFixed(2)}</td>
                <td className={gainLossStyle}>{stock.gainLoss.toFixed(2)}</td>
                <td>{stock.peRatio}</td>
                <td>{stock.latestEarnings}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default PortfolioTable;
