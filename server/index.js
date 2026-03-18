// Local development entry point — starts the Express server on a port.
// In production (Vercel), server/api/index.js is used instead.
import dotenv from 'dotenv';
import { connectDB } from './app.js';
import app from './app.js';

dotenv.config();

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  const server = app.listen(PORT, () =>
    console.log(`🚀 Server running on http://localhost:${PORT}`)
  );
  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.error(`\n❌ Port ${PORT} is already in use! Close the other server first.\n`);
    } else {
      console.error('❌ Server error:', err.message);
    }
    process.exit(1);
  });
}).catch(err => {
  console.error('❌ Failed to connect to MongoDB:', err.message);
  process.exit(1);
});
