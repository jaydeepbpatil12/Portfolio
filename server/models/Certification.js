import mongoose from 'mongoose';

const certificationSchema = new mongoose.Schema({
  title: { type: String, required: true },
  provider: { type: String, required: true },
  date: { type: String },
  description: { type: String },
  imageId: { type: String }, // Google Drive file ID
  link: { type: String },    // Google Drive view link
  order: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.model('Certification', certificationSchema);
