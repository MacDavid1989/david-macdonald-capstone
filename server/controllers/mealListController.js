const mealModel= require('../model/mealListModel');

getAllMeals = (_req, res) => {
    // calls getMeals which returns a promise and upon success sends the data object to the client
    mealModel.getMeals()
    .then((data) => {
        res.status(200).json(data);
    })
    .catch((err) => {
        console.log(err);
        res.status(404).send(err);
    });
}

postMeal = (req, res) => {
    // passes the newMeal object to the addNewMeal function
    const newMeal = req.body;
    mealModel.addNewMeal(newMeal)

    // passes the newIngredients array to the addNewIngredients function
    const newIngredients = newMeal.ingredients;
    mealModel.addNewIngredients(newIngredients)

    res.status(201).send(newMeal)
}

deleteMeal = (req, res) => {
    // passes the meal id to the respective functions which make delete requests to the db
    const meal = req.params.id
    mealModel.deleteMeals(meal)
    mealModel.deleteIngredients(meal)

    return res.status(200).json({ success: true})
}

module.exports = { 
    getAllMeals, 
    postMeal, 
    deleteMeal 
}