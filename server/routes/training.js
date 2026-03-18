import express from 'express';
import Training from '../models/Training.js';

const router = express.Router();

// GET all training
router.get('/', async (req, res) => {
  try {
    const trainings = await Training.find().sort({ order: 1, createdAt: -1 });
    res.json(trainings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST create training
router.post('/', async (req, res) => {
  try {
    const training = new Training(req.body);
    await training.save();
    res.status(201).json(training);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT update training
router.put('/:id', async (req, res) => {
  try {
    const training = await Training.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(training);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE training
router.delete('/:id', async (req, res) => {
  try {
    await Training.findByIdAndDelete(req.params.id);
    res.json({ message: 'Training deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
