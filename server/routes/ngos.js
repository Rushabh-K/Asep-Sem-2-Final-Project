const router = require('express').Router();
const auth = require('../middleware/auth');
const User = require('../models/User');

// Get all NGOs
router.get('/', async (req, res) => {
  try {
    const ngos = await User.find({ role: 'ngo' }).select('-password');
    res.json(ngos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get NGO by ID
router.get('/:id', async (req, res) => {
  try {
    const ngo = await User.findOne({ _id: req.params.id, role: 'ngo' }).select('-password');
    if (!ngo) {
      return res.status(404).json({ message: 'NGO not found' });
    }
    res.json(ngo);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update NGO profile (protected route)
router.put('/:id', auth, async (req, res) => {
  try {
    if (req.user.role !== 'ngo' && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const ngo = await User.findOne({ _id: req.params.id, role: 'ngo' });
    if (!ngo) {
      return res.status(404).json({ message: 'NGO not found' });
    }

    // Only allow updating own profile unless admin
    if (req.user.role !== 'admin' && req.user.id !== req.params.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const updates = req.body;
    Object.keys(updates).forEach(key => {
      if (key !== 'role' && key !== 'password') { // Prevent role and password updates
        ngo[key] = updates[key];
      }
    });

    await ngo.save();
    res.json({ message: 'NGO profile updated successfully', ngo });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router; 