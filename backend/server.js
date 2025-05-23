const express = require('express');
const cors = require('cors');
const yahooRoutes = require('./routes/yahoo');

const app = express();
app.use(cors());

app.use('/api/yahoo', yahooRoutes);

app.listen(5000, () => {
  console.log('Server running on port 5000');
});
