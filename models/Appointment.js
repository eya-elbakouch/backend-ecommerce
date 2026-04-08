const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  vet_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Vet', required: true },
  pet_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Pet', required: true },
  date: { type: Date, required: true },
  reason: { type: String, required: true },
  status: { type: String, enum: ['En attente', 'Confirmé', 'Annulé'], default: 'Confirmé' }
}, { timestamps: true });

module.exports = mongoose.model('Appointment', appointmentSchema);
