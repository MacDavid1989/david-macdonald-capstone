const express = require('express');
const app = express();
const bodyParser = require('body-parser');
// import database connection
const dbConnection = require('./connections/database');
// import routes
const mealList = require('./routes/mealListRoute')
const groceryList = require('./routes/groceryListRoute')

// utilize environment variables via process.env object
require('dotenv').config();
const PORT = process.env.PORT || 5000;

// allow cross-origin resource sharing
const cors = require('cors');
app.use(cors())

// request.body middleware
app.use(express.json())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// route for user selected meals
app.use('/meals', mealList);

// route for grocery list
app.use('/groceries', groceryList);

// initialize db connection and have server listen on successful connection
dbConnection.initialize()
.then(() => {
    app.listen(PORT, () => {
        console.log(`Server listening on port: ${PORT}`);
    })
})
.catch(error => console.log("Error on HTTP start.\nError code >" + error));