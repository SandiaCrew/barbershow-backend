const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientController');
const Visit = require('../models/Visit');
const Client = require('../models/Client'); // Ensure Client model is imported

// Existing routes
router.get('/', clientController.getAllClients);

// Modify this route to include visits
router.get('/:id', async (req, res) => {
  try {
    const client = await Client.findById(req.params.id).populate('visits');
    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }
    res.status(200).json(client);
  } catch (error) {
    console.error('Error fetching client with visits:', error);
    res.status(500).json({ message: 'Error fetching client with visits' });
  }
});

router.post('/', clientController.createClient);
router.patch('/:id', clientController.getClient, clientController.updateClient);
router.delete('/:id', clientController.getClient, clientController.deleteClient);

// New route for fetching visits for a specific client
router.get('/:clientId/visits', async (req, res) => {
  try {
    const clientId = req.params.clientId;
    console.log("Fetching visits for clientId:", clientId);
    const visits = await Visit.find({ clientId: clientId });
    if (!visits.length) {
      console.log('No visits found for clientId:', clientId);
      return res.status(404).json({ message: 'Visits not found' });
    }
    res.status(200).json(visits);
  } catch (error) {
    console.error('Error fetching visits:', error);
    res.status(500).json({ message: 'Error fetching visits' });
  }
});

// New route to log a visit
router.post('/:clientId/log-visit', async (req, res) => {
  const { clientId } = req.params;
  const today = new Date().setHours(0, 0, 0, 0); // Get today's date at midnight

  try {
    // Check if a visit has already been logged today
    const existingVisit = await Visit.findOne({ clientId, date: today });

    if (existingVisit) {
      return res.status(400).json({ message: 'Visit already logged for today' });
    }

    // Create a new visit
    const newVisit = new Visit({ clientId, date: today });
    await newVisit.save();

    res.status(200).json({ message: 'Visit logged successfully' });
  } catch (error) {
    console.error('Error logging visit:', error);
    res.status(500).json({ message: 'Error logging visit' });
  }
});

module.exports = router;
