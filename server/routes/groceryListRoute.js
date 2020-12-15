const express = require('express')
const router = express.Router();
const groceryListController = require('../controllers/groceryListController')

// GET route to return groceries for a specified week id
router.get('/:id', groceryListController.getAllGroceries)

// PUT route to update item isCompleted value based on item id
router.put('/:id', groceryListController.updateIsCompleted)

// POST route to add a user item to the server
router.post('/', groceryListController.addGroceryItem)

// DELETE route to remove a user item from the server
router.delete('/:id', groceryListController.deleteGroceryItem)

module.exports = router;