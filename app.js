const express = require('express');
const app = express();

const { searchChildren } = require('./controller');

app.use(express.json());

app.post('/search', searchChildren);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
