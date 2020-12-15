const groceryModel = require('../model/groceryListModel');
const { v4: uuidv4 } = require("uuid");

getAllGroceries = (req, res) => {
    // fetches all recipe ingredients
    const ingredients = groceryModel.getIngredients()
    // filters the items that match the req.params.id and passes them through the sort function
    const groceryRecipe = groceryModel.groceryList(ingredients.filter(items => items.week === parseInt(req.params.id)))
    
    // fetches all user ingredients
    const userItems = groceryModel.getUserItems()
    // filters the items that match the req.params.id and passes them through the sort function
    const groceryUser = groceryModel.groceryList(userItems.filter(items => items.week === parseInt(req.params.id)))
    
    // responds with the spread values of the two sorted arrays above
    res.status(200).json([...groceryRecipe, ...groceryUser])
}

updateIsCompleted = (req, res) => {
    // fetches all grocery items, user items, and recipe ingredients
    const groceries = groceryModel.getGroceries();
    const userItems = groceryModel.getUserItems();
    const recipeItems = groceryModel.getIngredients();

    const groceriesUpdate = groceryModel.setIsCompleted(groceries,req.params.id);
    const userItemsUpdate = groceryModel.setIsCompleted(userItems,req.params.id);
    const recipeItemsUpdate = groceryModel.setIsCompleted(recipeItems,req.params.id);

    // groceries.forEach(item => {
    //     if(item.id===req.params.id){
    //         if(item.isCompleted===false){
    //             return item.isCompleted = true;
    //         } else {
    //             return item.isCompleted = false;
    //         }
    //     }
    // })
    // userItems.forEach(item => {
    //     if(item.id===req.params.id){
    //         if(item.isCompleted===false){
    //             return item.isCompleted = true;
    //         } else {
    //             return item.isCompleted = false;
    //         }
    //     }
    // })
    // recipeItems.forEach(item => {
    //     if(item.id===req.params.id){
    //         if(item.isCompleted===false){
    //             return item.isCompleted = true;
    //         } else {
    //             return item.isCompleted = false;
    //         }
    //     }
    // })

    groceryModel.writeGroceries(groceriesUpdate)
    groceryModel.writeUserItems(userItemsUpdate)
    groceryModel.writeIngredients(recipeItemsUpdate)

    return res.status(204).json({ success: true})
}

addGroceryItem = (req, res) => {
    if(req.body.plan){
        const groceries = [...groceryModel.getUserItems(), ...groceryModel.getIngredients()]
        groceryModel.writeGroceries(groceries)
        return res.status(201).json({ success: true})
    } else {
        const newGrocery = {
            id: uuidv4(),
            food: req.body.food.toLowerCase(),
            weight: req.body.weight,
            week: req.body.week,
            category: "user item",
            isCompleted: req.body.isCompleted
        }
        const userItems = groceryModel.getUserItems()
        userItems.unshift(newGrocery)
        groceryModel.writeUserItems(userItems)
        const groceries = [...groceryModel.getUserItems(), ...groceryModel.getIngredients()]
        groceryModel.writeGroceries(groceries)
        return res.status(201).json(newGrocery)
    }
}

deleteGroceryItem = (req, res) => {
    const userItems = groceryModel.getUserItems()
    const groceries = groceryModel.getGroceries()

    groceryModel.writeUserItems(userItems.filter(item=>item.id!==req.params.id))
    
    groceryModel.writeGroceries(groceries.filter(item=>item.id!==req.params.id))

    res.status(200).json({ success: true})
}

module.exports = {
    getAllGroceries,
    updateIsCompleted,
    addGroceryItem,
    deleteGroceryItem
}