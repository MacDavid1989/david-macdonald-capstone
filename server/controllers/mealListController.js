const mealModel= require('../model/mealListModel');

getAllMeals = (_req, res) => {
    const meals = mealModel.getMeals()
    res.status(200).json(meals)
}

postMeal = (req, res) => {
    const newMeal = req.body;
    mealModel.addNewMeal(newMeal)
    const newIngredients = newMeal.ingredients;
    mealModel.addNewIngredients(newIngredients)
    res.status(201).send(newMeal)
}

deleteMeal = (req, res) => {
    const ingredients = mealModel.getIngredients().filter(ingredient => ingredient.mealId!==req.params.id)
    mealModel.writeIngredients(ingredients)
    const meals = mealModel.getMeals().filter(meal => meal.id!==req.params.id)
    mealModel.writeMeals(meals)
    return res.status(200).json({ success: true})
}

module.exports = { getAllMeals, postMeal, deleteMeal }