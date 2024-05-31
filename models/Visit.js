const mongoose = require('mongoose');

const visitSchema = new mongoose.Schema({
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client',
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  // Add other fields as necessary
});

module.exports = mongoose.model('Visit', visitSchema);
