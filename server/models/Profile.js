import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  title: { type: String, required: true },
  bio: { type: String, required: true },
  photoId: { type: String }, // Google Drive file ID
  github: { type: String },
  linkedin: { type: String },
  email: { type: String },
  phone: { type: String },
  resumeLink: { type: String },
}, { timestamps: true });

export default mongoose.model('Profile', profileSchema);
