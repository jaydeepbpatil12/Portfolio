// Vercel Serverless Catch-All Handler
// Handles every /api/* request by forwarding to the Express app.
// Vercel auto-discovers this file from the root api/ directory.
import app, { connectDB } from '../server/app.js';

export default async function handler(req, res) {
  await connectDB(); // Cached — no-op after first call
  return app(req, res);
}
