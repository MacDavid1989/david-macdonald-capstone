const express = require('express')
const fs = require('fs');
const { v4: uuidv4 } = require("uuid");
const router = express.Router();
const mealsFile = './data/meals.json';
const ingredientsFile = './data/ingredients.json';

// post route for meals to be added for user
router.post('/', (req, res) => {
    const newMeal = req.body;
    addNewMeal(newMeal)
    const newIngredients = newMeal.ingredients;
    addNewIngredients(newIngredients)
    res.status(201).send(newMeal)
})

// get route for meals to be rendered on my meals page
router.get('/', (_req, res) => {
    const meals = getMeals()
    res.status(200).json(meals)
})

// delete route for removing meals from my meals page
router.delete('/:id', (req, res) => {
    const ingredients = getIngredients().map(ingredient => ingredient.mealId!==req.params.id)
    writeIngredients(ingredients)
    const meals = getMeals()
    meals.map((meal,i) => {
        meal.id===req.params.id&&meals.splice(i,1)&&
        res.status(202).json(meal)
    })
    writeMeals(meals)
})

getMeals = () => {
    return JSON.parse(fs.readFileSync(mealsFile));
}

getIngredients = () => {
    return JSON.parse(fs.readFileSync(ingredientsFile))
}

writeMeals = (meals) => {
    fs.writeFileSync(mealsFile, JSON.stringify([...meals]), err=>console.log(err))
}

writeIngredients = (ingredients) => {
    fs.writeFileSync(ingredientsFile, JSON.stringify([...ingredients]), err=>console.log(err))
}

addNewMeal = (newMeal) => {
    const meals = getMeals()
    meals.push(newMeal)
    writeMeals(meals)
}

addNewIngredients = (newIngredients) => {
    const ingredients = getIngredients()
    ingredients.push(...newIngredients)
    writeIngredients(ingredients)
}

module.exports = router;