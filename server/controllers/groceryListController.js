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
    console.log(groceryUser.foodId)
    // responds with the spread values of the two sorted arrays above
    res.status(200).json([...groceryRecipe, ...groceryUser])
}

updateIsCompleted = (req, res) => {
    // fetches all grocery items, user items, and recipe ingredients
    const groceries = groceryModel.getGroceries();
    const userItems = groceryModel.getUserItems();
    const recipeItems = groceryModel.getIngredients();

    // updates isCompleted value of item matching req.params.id
    const groceriesUpdate = groceryModel.setIsCompleted(groceries, req.params.id);
    const userItemsUpdate = groceryModel.setIsCompleted(userItems, req.params.id);
    const recipeItemsUpdate = groceryModel.setIsCompleted(recipeItems, req.params.id);

    // overwrites data files with the update values
    groceryModel.writeGroceries(groceriesUpdate)
    groceryModel.writeUserItems(userItemsUpdate)
    groceryModel.writeIngredients(recipeItemsUpdate)

    return res.status(204).json({ success: true})
}

addGroceryItem = (req, res) => {
    // checks if the incoming request is from the meal plan page
    if(req.body.plan){
        // spreads fetched data for user items and recipe ingredients containing the ingredients from the 
        // newly selected meal into a single array and overwrites the data file
        const groceries = [...groceryModel.getUserItems(), ...groceryModel.getIngredients()]
        groceryModel.writeGroceries(groceries)
        
        return res.status(201).json({ success: true})
    } else {
        // passes req.body into the function to generate and write a new item object to the data file
        const newGroceryItem = groceryModel.addNewUserItem(req.body)
        
        // spreads the fetched user item and recipe ingredients data into an array and overwrites the data file
        const groceries = [...groceryModel.getUserItems(), ...groceryModel.getIngredients()]
        groceryModel.writeGroceries(groceries)
        
        return res.status(201).json(newGroceryItem)
    }
}

deleteGroceryItem = (req, res) => {
    // fetches user items and writes a filtered array without the items matching req.params.id to the data file
    const userItems = groceryModel.getUserItems()
    groceryModel.writeUserItems(userItems.filter(item=>item.id!==req.params.id))
    
    // fetches grocery items and writes a filtered array without the items matching req.params.id to the data file
    const groceries = groceryModel.getGroceries()
    groceryModel.writeGroceries(groceries.filter(item=>item.id!==req.params.id))

    res.status(200).json({ success: true})
}

module.exports = {
    getAllGroceries,
    updateIsCompleted,
    addGroceryItem,
    deleteGroceryItem
}