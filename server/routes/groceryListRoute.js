const express = require('express')
const fs = require('fs');
const { v4: uuidv4 } = require("uuid");
const router = express.Router();
const mealsFile = './data/meals.json';
const ingredientsFile = './data/ingredients.json';

// get route for meals to be rendered on my meals page
router.get('/', (_req, res) => {
    const ingredients = getIngredients()
    const groceries = groceryList(ingredients)
    res.status(200).json(groceries)
})

groceryList = (ingredients) => {
    ingredients.sort((a, b) => {
        let fa = a.food.toLowerCase()
        let fb = b.food.toLowerCase()
        if (fa < fb) {
            return -1;
        }
        if (fa > fb) {
            return 1;
        }
        return 0;
        
    })
    for(i=0; i < ingredients.length; i++){
        while(ingredients[i+1] !== undefined && ingredients[i].food === ingredients[i+1].food){
            ingredients[i].weight = ingredients[i].weight + ingredients[i+1].weight
            ingredients.splice(i+1, 1)
        }
    }

    return ingredients
}

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