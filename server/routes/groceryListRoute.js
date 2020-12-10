const express = require('express')
const fs = require('fs');
const { v4: uuidv4 } = require("uuid");
const router = express.Router();
const mealsFile = './data/meals.json';
const ingredientsFile = './data/ingredients.json';
const groceriesFile = './data/groceries.json';
const userItemsFile = './data/userItems.json';
const recipeItemsFile = './data/recipeItems.json';

// get route for meals to be rendered on my meals page
router.get('/', (_req, res) => {
    const groceries = getGroceries()
    res.status(200).json(groceries)
})

router.post('/', (req, res) => {
    if(req.body.plan){
        const ingredients = getIngredients();
        const recipeItems = groceryList(ingredients)
        writeRecipeItems(recipeItems)
        const groceries = [...getUserItems(), ...getRecipeItems()]
        writeGroceries(groceries)
        return res.status(201).json({ success: true})
    } else {
        const newGrocery = {
            id: uuidv4(),
            food: req.body.food.toLowerCase(),
            weight: req.body.weight,
            category: "user item"
        }
        const userItems = getUserItems()
        userItems.unshift(newGrocery)
        writeUserItems(userItems)
        const groceries = [...getUserItems(), ...getRecipeItems()]
        writeGroceries(groceries)
        return res.status(201).json(newGrocery)
    }
})

router.delete('/:id', (req, res) => {
    const userItems = getUserItems()
    const recipeItems = getRecipeItems()
    const groceries = getGroceries()

    writeUserItems(userItems.filter(item=>item.id!==req.params.id))

    writeRecipeItems(recipeItems.filter(item=>item.id!==req.params.id))
    
    writeGroceries(groceries.filter(item=>item.id!==req.params.id))

    res.status(200).json({ success: true})
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
        while(ingredients[i+1] !== undefined && 
            (ingredients[i].food.toLowerCase().replace(/-/g, ' ') === ingredients[i+1].food.toLowerCase().replace(/-/g, ' ') 
            || (ingredients[i].food.toLowerCase().replace(/-/g, ' ') + 's') === ingredients[i+1].food.toLowerCase().replace(/-/g, ' ') 
            || ingredients[i].food.toLowerCase().replace(/-/g, ' ') === (ingredients[i+1].food.toLowerCase().replace(/-/g, ' ') + 's'))){
                ingredients[i].weight = ingredients[i].weight + ingredients[i+1].weight
                ingredients.splice(i+1, 1)
        }
    }

    // ingredients.sort((a, b) => {
    //     let fa = a.category.toLowerCase()
    //     let fb = b.category.toLowerCase()
    //     if (fa < fb) {
    //         return -1;
    //     }
    //     if (fa > fb) {
    //         return 1;
    //     }
    //     return 0;
        
    // })


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

getRecipeItems = () => {
    return JSON.parse(fs.readFileSync(recipeItemsFile))
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

writeRecipeItems = (recipeItems) => {
    fs.writeFileSync(recipeItemsFile, JSON.stringify([...recipeItems]), err=>console.log(err))
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