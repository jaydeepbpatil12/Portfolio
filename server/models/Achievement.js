import mongoose from 'mongoose';

const achievementSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  portfolioLink: { type: String },
  icon: { type: String, default: 'award' }, // 'award' | 'code' | 'target'
  order: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.model('Achievement', achievementSchema);
