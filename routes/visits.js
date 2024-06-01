const express = require('express');
const router = express.Router();
const Visit = require('../models/Visit');

// Route for creating a new visit
router.post('/', async (req, res) => {
  const { clientId, date } = req.body;

  try {
    const newVisit = new Visit({
      clientId,
      date,
    });

    const savedVisit = await newVisit.save();
    res.status(201).json(savedVisit);
  } catch (error) {
    console.error('Error creating visit:', error);
    res.status(500).json({ message: 'Error creating visit' });
  }
});

module.exports = router;
