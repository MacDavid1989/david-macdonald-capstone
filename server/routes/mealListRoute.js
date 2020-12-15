const express = require('express')
const router = express.Router();
const mealListController = require('../controllers/mealListController')

// GET route for list of meals selected by the user
router.get('/', mealListController.getAllMeals)

// POST route for adding a meal to the server
router.post('/', mealListController.postMeal)

// DELETE route for removing a meal from the server
router.delete('/:id', mealListController.deleteMeal)

module.exports = router;