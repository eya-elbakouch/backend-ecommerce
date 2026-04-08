const Vet = require('../models/Vet');

const getVets = async (req, res) => {
  try {
    const vets = await Vet.find({});
    res.json(vets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getVets };
