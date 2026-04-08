const Pet = require('../models/Pet');

const getPets = async (req, res) => {
  try {
    const pets = await Pet.find({ user_id: req.user._id });
    res.json(pets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createPet = async (req, res) => {
  try {
    const pet = new Pet({ ...req.body, user_id: req.user._id });
    const createdPet = await pet.save();
    res.status(201).json(createdPet);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updatePet = async (req, res) => {
  try {
    const pet = await Pet.findOneAndUpdate(
      { _id: req.params.id, user_id: req.user._id },
      req.body,
      { new: true }
    );
    if (pet) {
      res.json(pet);
    } else {
      res.status(404).json({ message: 'Pet not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deletePet = async (req, res) => {
  try {
    const pet = await Pet.findOneAndDelete({ _id: req.params.id, user_id: req.user._id });
    if (pet) {
      res.json({ message: 'Pet removed' });
    } else {
      res.status(404).json({ message: 'Pet not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getPets, createPet, updatePet, deletePet };
