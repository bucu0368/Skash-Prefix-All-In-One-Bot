
const express = require('express');
const { getJson } = require('@helpers/HttpUtils');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// Random dog image endpoint
app.get('/api/dog', async (req, res) => {
  try {
    const response = await getJson('https://dog.ceo/api/breeds/image/random');
    
    if (response.success && response.data) {
      res.json({
        success: true,
        image: response.data.message,
        status: response.data.status
      });
    } else {
      res.status(500).json({
        success: false,
        error: 'Failed to fetch dog image'
      });
    }
  } catch (error) {
    console.error('Error fetching dog image:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'API is running',
    timestamp: new Date().toISOString()
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint not found'
  });
});

function startServer() {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`API server running on port ${PORT}`);
  });
}

module.exports = { startServer };
