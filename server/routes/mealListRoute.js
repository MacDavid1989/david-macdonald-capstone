const express = require('express')
const fs = require('fs');
const { v4: uuidv4 } = require("uuid");
const router = express.Router();

router.post('/', (req, res) => {
    console.log(req.body)
})

module.exports = router;