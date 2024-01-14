const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3001;

app.use(express.static(path.join(__dirname, 'client/build')));



app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

app.get('/api/generate-qr', (req, res) => {
  const { data } = req.query;
  // Simulate QR code generation (replace with actual logic using a library)
  const qrImageData = `data:image/png;base64,${Buffer.from(data).toString('base64')}`;
  res.json({ qrImageData });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
