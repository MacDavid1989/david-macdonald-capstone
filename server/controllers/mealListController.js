const mealModel= require('../model/mealListModel');

getAllMeals = (_req, res) => {
    // fetches and responds with the array of all meals
    const meals = mealModel.getMeals()
    res.status(200).json(meals)
}

postMeal = (req, res) => {
    // creates a new meal object and adds it to the server
    const newMeal = req.body;
    mealModel.addNewMeal(newMeal)

    // creates a new ingredient object and adds it to the server
    const newIngredients = newMeal.ingredients;
    mealModel.addNewIngredients(newIngredients)

    res.status(201).send(newMeal)
}

deleteMeal = (req, res) => {
    // fetches all ingredients, filters out the items matching the req.params.id, and writes the new array to the server
    const ingredients = mealModel.getIngredients().filter(ingredient => ingredient.mealId!==req.params.id)
    mealModel.writeIngredients(ingredients)

    // fetches all meals, filters out the meal matching the req.params.id, and writes the new array to the server 
    const meals = mealModel.getMeals().filter(meal => meal.id!==req.params.id)
    mealModel.writeMeals(meals)
    return res.status(200).json({ success: true})
}

module.exports = { getAllMeals, postMeal, deleteMeal }