// routes/clients.js
const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientController');

// Get all clients
router.get('/', clientController.getAllClients);

// Get one client
router.get('/:id', clientController.getClient, clientController.getClientById);

// Create a client
router.post('/', clientController.createClient);

// Update a client
router.patch('/:id', clientController.getClient, clientController.updateClient);

// Delete a client
router.delete('/:id', clientController.getClient, clientController.deleteClient);

module.exports = router;
