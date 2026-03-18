import mongoose from 'mongoose';

const trainingSchema = new mongoose.Schema({
  organization: { type: String, required: true },
  role: { type: String },
  description: [{ type: String }],
  techStack: [{ type: String }],
  image: { type: String },
  certificateLink: { type: String },
  order: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.model('Training', trainingSchema);
