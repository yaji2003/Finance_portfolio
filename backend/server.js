const express = require('express');
const cors = require('cors');
const financeRoutes = require('./routes/finance');

const app = express();
app.use(cors());
app.use('/api/finance', financeRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
