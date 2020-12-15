const express = require('express')
const router = express.Router();
const mealListController = require('../controllers/mealListController')

// get route for meals to be rendered on my meals page
router.get('/', mealListController.getAllMeals)

// post route for meals to be added for user
router.post('/', mealListController.postMeal)

// delete route for removing meals from my meals page
router.delete('/:id', mealListController.deleteMeal)

module.exports = router;