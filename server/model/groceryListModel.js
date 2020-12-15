const fs = require('fs');
const { v4: uuidv4 } = require("uuid");
const ingredientsFile = './data/ingredients.json';
const groceriesFile = './data/groceries.json';
const userItemsFile = './data/userItems.json';

// creates a grocery list from the items array passed as an argument
groceryList = (ingredients) => {
    // sorts the ingredients by their food id
    let sortedIngredients = sortByFoodId(ingredients)

    // consolidates all foods in the sorted list by adding the weight of the next matching foodId
    // then splicing that next matching item from the array
    let consolidatedIngredients = consolidateIngredients(sortedIngredients)

    // sorts the ingredients by their food category
    sortedIngredients = sortByCategory(consolidatedIngredients)

    return sortedIngredients
}

// compares the current and next food ids, if they match, the weights are added together and the next value is spliced
// this continues until the end of the array.
consolidateIngredients = (ingredients) => {
    for(i=0; i < ingredients.length; i++){
        while(ingredients[i+1] !== undefined && ingredients[i].foodId !== undefined &&
            (ingredients[i].foodId === ingredients[i+1].foodId)){
                ingredients[i].weight = ingredients[i].weight + ingredients[i+1].weight
                ingredients.splice(i+1, 1)
        }
    }

    return ingredients
}

// compares the the foodIds of the item array, the strings are sorted alphabetically grouping like ids together 
sortByFoodId = (item) => {
    item.sort((a, b) => {
        if(a.foodId === undefined && b.foodId === undefined){
            return 0;
        } else if(a.foodId === undefined){
            return -1;
        } else if(b.foodId === undefined){
            return 1;
        } else {
            let fa = a.foodId
            let fb = b.foodId

            if (fa < fb) {
                return -1;
            } else if (fa > fb) {
                return 1;
            } else {
                return 0;
            }
        }  
    })

    return item
}


// compares the the lower case categories of the item array, the strings are sorted alphabetically grouping like categories together
// if the category is null the values are placed at the end of the array 
sortByCategory = (item) => {
    item.sort((a, b) => {
        if(a.category === null && b.category === null){
            return 0;
        } else if(a.category === null){
            return -1;
        } else if(b.category === null){
            return 1;
        } else {
            let fa = a.category.toLowerCase()
            let fb = b.category.toLowerCase()

            if (fa < fb) {
                return -1;
            } else if (fa > fb) {
                return 1;
            } else {
                return 0;
            }
        }  
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