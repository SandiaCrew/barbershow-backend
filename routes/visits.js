const express = require('express');
const router = express.Router();
const Visit = require('../models/Visit');

// Route to log a visit
router.post('/:clientId/log-visit', async (req, res) => {
  try {
    const { clientId } = req.params;
    const visitDate = new Date().toISOString().split('T')[0]; // Get current date

    // Check if a visit is already logged for today
    const existingVisit = await Visit.findOne({ clientId, date: visitDate });
    if (existingVisit) {
      return res.status(400).json({ message: 'Visit already logged for today' });
    }

    // Create and save a new visit
    const newVisit = new Visit({ clientId, date: visitDate });
    await newVisit.save();

    res.status(201).json(newVisit);
  } catch (error) {
    console.error('Error logging visit:', error);
    res.status(500).json({ message: 'Error logging visit' });
  }
});


module.exports = router;
