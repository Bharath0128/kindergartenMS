const express = require('express');
const app = express();

const { searchChildren } = require('./controller');

app.get('/search', searchChildren);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
