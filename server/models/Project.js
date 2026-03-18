import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  techStack: [{ type: String }],
  categories: [{ type: String }],
  image: { type: String }, // Unsplash or external URL
  liveDemo: { type: String, default: '#' },
  sourceCode: { type: String },
  featured: { type: Boolean, default: false },
  order: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.model('Project', projectSchema);
