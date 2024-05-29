const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
  },
  visits: [
    {
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

const Client = mongoose.model('Client', clientSchema);

module.exports = Client;
