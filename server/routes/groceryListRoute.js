const express = require('express')
const router = express.Router();
const groceryListController = require('../controllers/groceryListController')

router.get('/:id', groceryListController.getAllGroceries)

router.put('/:id', groceryListController.updateIsCompleted)

router.post('/', groceryListController.addGroceryItem)

router.delete('/:id', groceryListController.deleteGroceryItem)

module.exports = router;