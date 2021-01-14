const fs = require('fs'); // file system module
const mealsFile = './data/meals.json';
const ingredientsFile = './data/ingredients.json';

// fetches the meals data
getMeals = () => {
    return new Promise((resolve, reject) => {
        const collection = db.collection("meals");
        collection.find({}).toArray((err, data) => {
          if(err){
            reject(err);
          }
          resolve(data);
        });
      });
}

// fetches the recipe items data
getIngredients = () => {
    return JSON.parse(fs.readFileSync(ingredientsFile))
}

// writes the meals data file
writeMeals = (meals) => {
    fs.writeFileSync(mealsFile, JSON.stringify([...meals]), err=>console.log(err))
}

// writes the recipe ingredients data file
writeIngredients = (ingredients) => {
    fs.writeFileSync(ingredientsFile, JSON.stringify([...ingredients]), err=>console.log(err))
}

// pushes the newMeal object to the meal array and overwrites the data file
addNewMeal = (newMeal) => {
    const meals = getMeals()
    meals.push(newMeal)
    writeMeals(meals)
}

// pushes the spread newIngredients array to the ingredients array and overwrites the data file
addNewIngredients = (newIngredients) => {
    const ingredients = getIngredients()
    ingredients.push(...newIngredients)
    writeIngredients(ingredients)
}

module.exports = { getMeals, getIngredients, writeMeals, writeIngredients, addNewMeal, addNewIngredients }