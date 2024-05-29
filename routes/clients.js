// routes/clients.js
const express = require('express');
const router = express.Router();

// Define a simple route to get all clients
router.get('/', (req, res) => {
  res.send('Get all clients');
});

module.exports = router;
