const groceryModel = require('../model/groceryListModel');

getAllGroceries = (req, res) => {
    // fetches all recipe ingredients and the on success fetches user items. Once successful returns the spread obects
    // in an array within a json object
    groceryModel.getIngredients()
    .then(data=>{
        const groceryRecipe = groceryModel.groceryList(data.filter(items => items.week === parseInt(req.params.id)))
        groceryModel.getUserItems()
        .then(data=>{
            const groceryUser = groceryModel.groceryList(data.filter(items => items.week === parseInt(req.params.id)))
            res.status(200).json([...groceryRecipe, ...groceryUser])
        })
    })
}

updateIsCompleted = (req, res) => {
    // passes the item id and category if resent to the setIsCompleted function which returns a promise.
    // when successful a response will be sent
    groceryModel.setIsCompleted(req.params.id, req.body.category)
    .then(data => res.status(204).json(data))
}

addGroceryItem = (req, res) => {
    // passes req.body into the function to generate a new item object for the db
    groceryModel.addNewUserItem(req.body)
    .then(data => res.status(201).json(data))
}

deleteGroceryItem = (req, res) => {
    // passes the item id to the deleteItem function which returns a promise that once successful leads to a response
    const item = req.params.id
    groceryModel.deleteItem(item)
    .then(data => res.status(200).json(data))
}

module.exports = {
    getAllGroceries,
    updateIsCompleted,
    addGroceryItem,
    deleteGroceryItem
}