import express from 'express';
import axios from 'axios';

const router = express.Router();

// Common browser-like headers to avoid Google blocking the request
const HEADERS = {
  'User-Agent':
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  'Accept': 'image/webp,image/apng,image/*,*/*;q=0.8',
  'Accept-Language': 'en-US,en;q=0.9',
  'Referer': 'https://drive.google.com/',
};

/**
 * Try to fetch the image from the given URL.
 * Returns the axios response stream or throws.
 */
async function fetchImage(url) {
  return axios.get(url, {
    responseType: 'stream',
    headers: HEADERS,
    maxRedirects: 10,
    timeout: 15000,
  });
}

/**
 * GET /api/image/:fileId
 *
 * Strategy (in order):
 *  1. Google Drive thumbnail API  → fast, no confirmation page
 *  2. uc?export=view with confirm=t → bypass virus-scan confirmation
 *  3. uc?export=view (original)    → fallback
 *
 * The thumbnail URL is the most reliable for images stored in Drive.
 */
router.get('/:fileId', async (req, res) => {
  const { fileId } = req.params;

  // Ordered list of URLs to try
  const candidates = [
    // Google's dedicated thumbnail/preview endpoint — bypasses confirmation
    `https://drive.google.com/thumbnail?id=${fileId}&sz=w1000`,
    // Direct download with confirmation bypass token
    `https://drive.google.com/uc?export=download&id=${fileId}&confirm=t`,
    // Standard view URL (may hit confirmation on large files)
    `https://drive.google.com/uc?export=view&id=${fileId}`,
  ];

  let lastError;

  for (const url of candidates) {
    try {
      const response = await fetchImage(url);

      const contentType = response.headers['content-type'] || 'image/jpeg';

      // If Google returned an HTML page it means we hit a confirmation wall
      // — skip to the next candidate
      if (contentType.includes('text/html')) {
        response.data.destroy(); // close the stream
        lastError = new Error(`Got HTML response from ${url}`);
        continue;
      }

      res.setHeader('Content-Type', contentType);
      res.setHeader('Cache-Control', 'public, max-age=86400'); // Cache 1 day
      response.data.pipe(res);
      return; // success — stop iterating
    } catch (err) {
      lastError = err;
    }
  }

  // All candidates failed
  console.error(`Image proxy: all attempts failed for fileId ${fileId}:`, lastError?.message);
  res.status(502).json({ message: 'Could not load image from Google Drive' });
});

export default router;
