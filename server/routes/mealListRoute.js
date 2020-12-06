const express = require('express')
const fs = require('fs');
const { v4: uuidv4 } = require("uuid");
const router = express.Router();

// post route for meals to be added for user
router.post('/', (req, res) => {
    console.log(req.body)
    const meal = req.body;
})

module.exports = router;