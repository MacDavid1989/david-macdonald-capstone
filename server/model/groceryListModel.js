const fs = require('fs');
const { v4: uuidv4 } = require("uuid");
const mealsFile = './data/meals.json';
const ingredientsFile = './data/ingredients.json';
const groceriesFile = './data/groceries.json';
const userItemsFile = './data/userItems.json';


groceryList = (ingredients) => {
    ingredients.sort((a, b) => {
        let fa = a.foodId
        let fb = b.foodId
        if (fa < fb) {
            return -1;
        }
        if (fa > fb) {
            return 1;
        }
        return 0;
        
    })

    for(i=0; i < ingredients.length; i++){
        while(ingredients[i+1] !== undefined && 
            (ingredients[i].food.toLowerCase().replace(/-/g, ' ') === ingredients[i+1].food.toLowerCase().replace(/-/g, ' ') 
            || (ingredients[i].food.toLowerCase().replace(/-/g, ' ') + 's') === ingredients[i+1].food.toLowerCase().replace(/-/g, ' ') 
            || ingredients[i].food.toLowerCase().replace(/-/g, ' ') === (ingredients[i+1].food.toLowerCase().replace(/-/g, ' ') + 's'))){
                ingredients[i].weight = ingredients[i].weight + ingredients[i+1].weight
                ingredients.splice(i+1, 1)
        }
    }

    ingredients.sort((a, b) => {
        let fa = a.category.toLowerCase()
        let fb = b.category.toLowerCase()
        if (fa < fb) {
            return -1;
        }
        if (fa > fb) {
            return 1;
        }
        return 0;
        
    })

    return ingredients
}

getMeals = () => {
    return JSON.parse(fs.readFileSync(mealsFile));
}

getIngredients = () => {
    return JSON.parse(fs.readFileSync(ingredientsFile))
}

getGroceries = () => {
    return JSON.parse(fs.readFileSync(groceriesFile))
}

getUserItems = () => {
    return JSON.parse(fs.readFileSync(userItemsFile))
}

writeMeals = (meals) => {
    fs.writeFileSync(mealsFile, JSON.stringify([...meals]), err=>console.log(err))
}

writeIngredients = (ingredients) => {
    fs.writeFileSync(ingredientsFile, JSON.stringify([...ingredients]), err=>console.log(err))
}

writeGroceries = (groceries) => {
    fs.writeFileSync(groceriesFile, JSON.stringify([...groceries]), err=>console.log(err))
}

writeUserItems = (userItems) => {
    fs.writeFileSync(userItemsFile, JSON.stringify([...userItems]), err=>console.log(err))
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

module.exports = {
    groceryList,
    getMeals,
    getIngredients,
    getGroceries,
    getUserItems,
    writeMeals,
    writeIngredients,
    writeGroceries,
    writeUserItems,
    addNewMeal,
    addNewIngredients
}