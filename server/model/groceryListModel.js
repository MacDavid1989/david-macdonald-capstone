const fs = require('fs');
const { v4: uuidv4 } = require("uuid");
const mealsFile = './data/meals.json';
const ingredientsFile = './data/ingredients.json';
const groceriesFile = './data/groceries.json';
const userItemsFile = './data/userItems.json';

groceryList = (ingredients) => {
    let sortedIngredients = sortByFoodId(ingredients)
    // ingredients.sort((a, b) => {
    //     let fa = a.foodId
    //     let fb = b.foodId
    //     if (fa < fb) {
    //         return -1;
    //     }
    //     if (fa > fb) {
    //         return 1;
    //     }
    //     return 0;
    // })

    let consolidatedIngredients = consolidateIngredients(sortedIngredients)
    // for(i=0; i < ingredients.length; i++){
    //     while(ingredients[i+1] !== undefined && 
    //         (ingredients[i].food.toLowerCase().replace(/-/g, ' ') === ingredients[i+1].food.toLowerCase().replace(/-/g, ' ') 
    //         || (ingredients[i].food.toLowerCase().replace(/-/g, ' ') + 's') === ingredients[i+1].food.toLowerCase().replace(/-/g, ' ') 
    //         || ingredients[i].food.toLowerCase().replace(/-/g, ' ') === (ingredients[i+1].food.toLowerCase().replace(/-/g, ' ') + 's'))){
    //             ingredients[i].weight = ingredients[i].weight + ingredients[i+1].weight
    //             ingredients.splice(i+1, 1)
    //     }
    // }

    sortedIngredients = sortByFoodName(consolidatedIngredients)
    // ingredients.sort((a, b) => {
    //     let fa = a.food
    //     let fb = b.food
    //     if (fa < fb) {
    //         return -1;
    //     }
    //     if (fa > fb) {
    //         return 1;
    //     }
    //     return 0;
    // })

    consolidatedIngredients = consolidateIngredients(sortedIngredients)
    // for(i=0; i < ingredients.length; i++){
    //     while(ingredients[i+1] !== undefined && 
    //         (ingredients[i].food.toLowerCase().replace(/-/g, ' ') === ingredients[i+1].food.toLowerCase().replace(/-/g, ' ') 
    //         || (ingredients[i].food.toLowerCase().replace(/-/g, ' ') + 's') === ingredients[i+1].food.toLowerCase().replace(/-/g, ' ') 
    //         || ingredients[i].food.toLowerCase().replace(/-/g, ' ') === (ingredients[i+1].food.toLowerCase().replace(/-/g, ' ') + 's'))){
    //             ingredients[i].weight = ingredients[i].weight + ingredients[i+1].weight
    //             ingredients.splice(i+1, 1)
    //     }
    // }

    sortedIngredients = sortByCategory(consolidatedIngredients)
    // ingredients.sort((a, b) => {
    //     let fa = !a.category || a.category.toLowerCase()
    //     let fb = !b.category || b.category.toLowerCase()
    //     if (fa < fb) {
    //         return -1;
    //     }
    //     if (fa > fb) {
    //         return 1;
    //     }
    //     return 0;  
    // })

    return sortedIngredients
}

consolidateIngredients = (ingredients) => {
    for(i=0; i < ingredients.length; i++){
        while(ingredients[i+1] !== undefined && 
            (ingredients[i].food.toLowerCase().replace(/-/g, ' ') === ingredients[i+1].food.toLowerCase().replace(/-/g, ' ') 
            || (ingredients[i].food.toLowerCase().replace(/-/g, ' ') + 's') === ingredients[i+1].food.toLowerCase().replace(/-/g, ' ') 
            || ingredients[i].food.toLowerCase().replace(/-/g, ' ') === (ingredients[i+1].food.toLowerCase().replace(/-/g, ' ') + 's'))){
                ingredients[i].weight = ingredients[i].weight + ingredients[i+1].weight
                ingredients.splice(i+1, 1)
        }
    }

    return ingredients
}

sortByFoodId = (item) => {
    item.sort((a, b) => {
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

    return item;
}

sortByFoodName = (item) => {
    item.sort((a, b) => {
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

    return item;
}

sortByCategory = (item) => {
    item.sort((a, b) => {
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

    return item
}

// fetches the recipe items data
getIngredients = () => {
    return JSON.parse(fs.readFileSync(ingredientsFile))
}

// fetches the grocery items data
getGroceries = () => {
    return JSON.parse(fs.readFileSync(groceriesFile))
}

// fetches the user items data
getUserItems = () => {
    return JSON.parse(fs.readFileSync(userItemsFile))
}

// writes the recipe ingredients data file
writeIngredients = (ingredients) => {
    fs.writeFileSync(ingredientsFile, JSON.stringify([...ingredients]), err=>console.log(err))
}

// writes the grocery items data file
writeGroceries = (groceries) => {
    fs.writeFileSync(groceriesFile, JSON.stringify([...groceries]), err=>console.log(err))
}

// writes the user items data file
writeUserItems = (userItems) => {
    fs.writeFileSync(userItemsFile, JSON.stringify([...userItems]), err=>console.log(err))
}

// adds the user entered item to the data file
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

// finds the clicked item id matching the item passed as an argument and sets its isCompleted value
// then returns the updated array of items
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
    getIngredients,
    getGroceries,
    getUserItems,
    writeIngredients,
    writeGroceries,
    writeUserItems,
    addNewUserItem,
    setIsCompleted
}