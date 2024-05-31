const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientController');
const Visit = require('../models/Visit'); // Add this line

// Existing routes
router.get('/', clientController.getAllClients);
router.get('/:id', clientController.getClient, clientController.getClientById);
router.post('/', clientController.createClient);
router.patch('/:id', clientController.getClient, clientController.updateClient);
router.delete('/:id', clientController.getClient, clientController.deleteClient);

// New route for fetching visits for a specific client
router.get('/:clientId/visits', async (req, res) => { // Add this block
  try {
    const clientId = req.params.clientId;
    const visits = await Visit.find({ clientId: clientId });
    if (!visits) {
      return res.status(404).json({ message: 'Visits not found' });
    }
    res.status(200).json(visits);
  } catch (error) {
    console.error('Error fetching visits:', error);
    res.status(500).json({ message: 'Error fetching visits' });
  }
}); // End of added block

module.exports = router;
