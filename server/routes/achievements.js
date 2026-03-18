import express from 'express';
import Achievement from '../models/Achievement.js';

const router = express.Router();

// GET all achievements
router.get('/', async (req, res) => {
  try {
    const achievements = await Achievement.find().sort({ order: 1, createdAt: -1 });
    res.json(achievements);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST create achievement
router.post('/', async (req, res) => {
  try {
    const achievement = new Achievement(req.body);
    await achievement.save();
    res.status(201).json(achievement);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;
