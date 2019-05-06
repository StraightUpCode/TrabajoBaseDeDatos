const express = require('express')
const router = express.Router();

router.get("/", (req, res) => res.send('Hellou Warudo'))

module.exports = router