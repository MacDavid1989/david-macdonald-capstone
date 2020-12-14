const groceryModel = require('../model/groceryListModel');
const { v4: uuidv4 } = require("uuid");

getAllGroceries = (req, res) => {
    const groceries = groceryModel.getGroceries()
    const grocery = groceryModel.groceryList(groceries.filter(items => items.week === parseInt(req.params.id)))
    res.status(200).json(grocery)
}

updateIsCompleted = (req, res) => {
    const groceries = groceryModel.getGroceries();
    const userItems = groceryModel.getUserItems();
    const recipeItems = groceryModel.getIngredients();

    groceries.forEach(item => {
        if(item.id===req.params.id){
            if(item.isCompleted===false){
                return item.isCompleted = true;
            } else {
                return item.isCompleted = false;
            }
        }
    })
    userItems.forEach(item => {
        if(item.id===req.params.id){
            if(item.isCompleted===false){
                return item.isCompleted = true;
            } else {
                return item.isCompleted = false;
            }
        }
    })

    recipeItems.forEach(item => {
        if(item.id===req.params.id){
            if(item.isCompleted===false){
                return item.isCompleted = true;
            } else {
                return item.isCompleted = false;
            }
        }
    })

    groceryModel.writeGroceries(groceries)
    groceryModel.writeUserItems(userItems)
    groceryModel.writeIngredients(recipeItems)

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