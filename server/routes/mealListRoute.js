const express = require('express')
const fs = require('fs');
const { v4: uuidv4 } = require("uuid");
const router = express.Router();
const mealsFile = './data/meals.json';
const ingredientsFile = './data/ingredients.json';

// post route for meals to be added for user
router.post('/', (req, res) => {
    const newMeal = req.body;
    writeMeals(newMeal)
    const newIngredients = newMeal.ingredients;
    writeIngredients(newIngredients)
    res.status(201).send(newMeal)
})

// get route for meals to be rendered on my meals page
router.get('/', (req, res) => {
    const mealList = getMeals()
    res.status(200).json(mealList)
})

// delete route for removing meals from my meals page
router.delete('/:id', (req, res) => {
    console.log(req.params.id)
    const mealList = getMeals()
    mealList.map((meal,i)=>{
        meal.id===req.params.id&&mealList.splice(i,1)&&
        res.status(202).json(meal)
    })
    fs.writeFileSync(mealsFile, JSON.stringify([...mealList]), err=>console.log(err))
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