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
        let fa = a.food
        let fb = b.food
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
        let fa = !a.category || a.category.toLowerCase()
        let fb = !b.category || b.category.toLowerCase()
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

addNewUserItem = (newUserItem) => {
    // creates new user item object and provides a unique id
    const item = {
        id: uuidv4(),
        food: newUserItem.food.toLowerCase(),
        weight: newUserItem.weight,
        week: newUserItem.week,
        category: "user item",
        isCompleted: newUserItem.isCompleted
    }

    // fetches all user items and adds the new item object to the array then overwrites the data file
    const userItems = getUserItems()
    userItems.unshift(item)
    writeUserItems(userItems)

    return item
}

setIsCompleted = (itemArray, id) => {
    itemArray.forEach(item => {
        if(item.id===id){
            if(item.isCompleted===false){
                return item.isCompleted = true;
            } else {
                return item.isCompleted = false;
            }
        }
    })

    return itemArray;
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
    addNewIngredients,
    addNewUserItem,
    setIsCompleted
}