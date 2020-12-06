const express = require('express');
const app = express();
const cors = require('cors');
const mealList = require('./routes/mealListRoute')

// utilize environment variables
require('dotenv').config();
const PORT = process.env.PORT || 5000;

// enable cross-origin resource sharing
app.use(cors())

// middleware that parses json
app.use(express.json())

app.use('/meals', mealList);

app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
})