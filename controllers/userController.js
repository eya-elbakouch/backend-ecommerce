const User = require('../models/User');

const getUsers = async (req, res) => {
  try {
    const users = await User.find({}).select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      if (user.role === 'admin') {
        return res.status(400).json({ message: 'Impossible de supprimer un autre administrateur.' });
      }
      await User.findByIdAndDelete(req.params.id);
      res.json({ message: 'Utilisateur supprimé avec succès.' });
    } else {
      res.status(404).json({ message: 'Utilisateur introuvable.' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getUsers, deleteUser };
