const express = require('express');
const app = express();
const cors = require('cors');
const mealList = require('./routes/mealListRoute')
const groceryList = require('./routes/groceryListRoute')

// utilize environment variables via process.env object
require('dotenv').config();
const PORT = process.env.PORT || 5000;

// allow cross-origin resource sharing
app.use(cors())

// request.body middleware
app.use(express.json())

// route for user selected meals
app.use('/meals', mealList);

// route for grocery list
app.use('/groceries', groceryList);

app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
})