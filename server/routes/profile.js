import express from 'express';
import Profile from '../models/Profile.js';

const router = express.Router();

// GET profile
router.get('/', async (req, res) => {
  try {
    const profile = await Profile.findOne();
    if (!profile) return res.status(404).json({ message: 'Profile not found' });
    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST create profile (run once to seed)
router.post('/', async (req, res) => {
  try {
    const existing = await Profile.findOne();
    if (existing) {
      const updated = await Profile.findByIdAndUpdate(existing._id, req.body, { new: true });
      return res.json(updated);
    }
    const profile = new Profile(req.body);
    await profile.save();
    res.status(201).json(profile);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;
