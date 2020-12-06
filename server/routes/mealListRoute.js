const express = require('express')
const fs = require('fs');
const { v4: uuidv4 } = require("uuid");
const router = express.Router();

router.use('/', (req, res) => {
    console.log('hey')
})

module.exports = router;