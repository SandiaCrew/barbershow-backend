// controllers/clientController.js
const Client = require('../models/Client');

// Get all clients
const getAllClients = async (req, res) => {
  try {
    const clients = await Client.find();
    res.json(clients);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get one client
const getClientById = (req, res) => {
  res.json(res.client);
};

// Create a client
const createClient = async (req, res) => {
  const client = new Client({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    visits: req.body.visits,
  });
  try {
    const newClient = await client.save();
    res.status(201).json(newClient);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update a client
const updateClient = async (req, res) => {
  if (req.body.name != null) {
    res.client.name = req.body.name;
  }
  if (req.body.email != null) {
    res.client.email = req.body.email;
  }
  if (req.body.phone != null) {
    res.client.phone = req.body.phone;
  }
  if (req.body.visits != null) {
    res.client.visits = req.body.visits;
  }
  try {
    const updatedClient = await res.client.save();
    res.json(updatedClient);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a client
const deleteClient = async (req, res) => {
  try {
    await Client.deleteOne({ _id: res.client._id });
    res.json({ message: 'Deleted Client' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Middleware to get client by ID
const getClient = async (req, res, next) => {
  let client;
  try {
    client = await Client.findById(req.params.id);
    if (client == null) {
      return res.status(404).json({ message: 'Cannot find client' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.client = client;
  next();
};

module.exports = {
  getAllClients,
  getClientById,
  createClient,
  updateClient,
  deleteClient,
  getClient
};
