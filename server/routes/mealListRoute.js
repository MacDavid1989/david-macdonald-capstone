const express = require('express')
const router = express.Router();
const mealListController = require('../controllers/mealListController')

const fs = require('fs');
const { v4: uuidv4 } = require("uuid");
const mealsFile = './data/meals.json';
const ingredientsFile = './data/ingredients.json';

// get route for meals to be rendered on my meals page
router.get('/', mealListController.getAllMeals)

// post route for meals to be added for user
router.post('/', mealListController.postMeal)

// delete route for removing meals from my meals page
router.delete('/:id', mealListController.deleteMeal)

// // get route for meals to be rendered on my meals page
// router.get('/', (_req, res) => {
//     const meals = getMeals()
//     res.status(200).json(meals)
// })

// // post route for meals to be added for user
// router.post('/', (req, res) => {
//     const newMeal = req.body;
//     addNewMeal(newMeal)
//     const newIngredients = newMeal.ingredients;
//     addNewIngredients(newIngredients)
//     res.status(201).send(newMeal)
// })

// // delete route for removing meals from my meals page
// router.delete('/:id', (req, res) => {
//     const ingredients = getIngredients().filter(ingredient => ingredient.mealId!==req.params.id)
//     writeIngredients(ingredients)
//     const meals = getMeals().filter(meal => meal.id!==req.params.id)
//     writeMeals(meals)
//     return res.status(200).json({ success: true})
// })

// getMeals = () => {
//     return JSON.parse(fs.readFileSync(mealsFile));
// }

// getIngredients = () => {
//     return JSON.parse(fs.readFileSync(ingredientsFile))
// }

// writeMeals = (meals) => {
//     fs.writeFileSync(mealsFile, JSON.stringify([...meals]), err=>console.log(err))
// }

// writeIngredients = (ingredients) => {
//     fs.writeFileSync(ingredientsFile, JSON.stringify([...ingredients]), err=>console.log(err))
// }

// addNewMeal = (newMeal) => {
//     const meals = getMeals()
//     meals.push(newMeal)
//     writeMeals(meals)
// }

// addNewIngredients = (newIngredients) => {
//     const ingredients = getIngredients()
//     ingredients.push(...newIngredients)
//     writeIngredients(ingredients)
// }

module.exports = router;