// Vercel Serverless Function entry point.
// Vercel calls this file for every /api/* request.
import app, { connectDB } from '../app.js';

export default async function handler(req, res) {
  await connectDB(); // No-op if already connected (cached)
  return app(req, res);
}
