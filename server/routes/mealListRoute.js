const express = require('express')
const fs = require('fs');
const { v4: uuidv4 } = require("uuid");
const router = express.Router();
const mealsFile = './data/meals.json';
const ingredientsFile = './data/ingredients.json';

// post route for meals to be added for user
router.post('/', (req, res) => {
    console.log('hey')
    const newMeal = req.body;
    writeMeals(newMeal)
    const newIngredients = newMeal.ingredients;
    writeIngredients(newIngredients)
    res.status(201).send(newMeal)
})

getMeals = () => {
    return JSON.parse(fs.readFileSync(mealsFile));
}

getIngredients = () => {
    return JSON.parse(fs.readFileSync(ingredientsFile))
}

writeMeals = (newMeal) => {
    const meals = getMeals()
    meals.push(newMeal)
    fs.writeFileSync(mealsFile, JSON.stringify([...meals]), err=>console.log(err))
}

writeIngredients = (newIngredients) => {
    const ingredients = getIngredients()
    ingredients.push(newIngredients)
    fs.writeFileSync(ingredientsFile, JSON.stringify([...ingredients]), err=>console.log(err))
}

module.exports = router;