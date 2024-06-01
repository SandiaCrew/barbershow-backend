const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true }
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtuals
clientSchema.virtual('visits', {
  ref: 'Visit',
  localField: '_id',
  foreignField: 'clientId'
});

const Client = mongoose.model('Client', clientSchema);

module.exports = Client;
