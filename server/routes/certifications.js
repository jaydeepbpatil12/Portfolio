import express from 'express';
import Certification from '../models/Certification.js';

const router = express.Router();

// GET all certifications
router.get('/', async (req, res) => {
  try {
    const certs = await Certification.find().sort({ order: 1, createdAt: -1 });
    res.json(certs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST create certification
router.post('/', async (req, res) => {
  try {
    const cert = new Certification(req.body);
    await cert.save();
    res.status(201).json(cert);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT update certification
router.put('/:id', async (req, res) => {
  try {
    const cert = await Certification.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(cert);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE certification
router.delete('/:id', async (req, res) => {
  try {
    await Certification.findByIdAndDelete(req.params.id);
    res.json({ message: 'Certification deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
