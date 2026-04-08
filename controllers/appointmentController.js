const Appointment = require('../models/Appointment');

const createAppointment = async (req, res) => {
  try {
    const { vet_id, pet_id, date, reason } = req.body;
    const appointment = new Appointment({
      user_id: req.user._id,
      vet_id,
      pet_id,
      date,
      reason
    });
    const created = await appointment.save();
    res.status(201).json(created);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMyAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({ user_id: req.user._id })
      .populate('vet_id')
      .populate('pet_id');
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const cancelAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (appointment && appointment.user_id.toString() === req.user._id.toString()) {
      appointment.status = 'Annulé';
      await appointment.save();
      res.json({ message: 'Rendez-vous annulé' });
    } else {
      res.status(404).json({ message: 'Rendez-vous non trouvé ou non autorisé' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createAppointment, getMyAppointments, cancelAppointment };
