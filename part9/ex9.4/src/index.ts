import express from 'express';

const app = express();

app.get('/api/hello', (_req, res) => {
  res.send('Hello fullstack');
});

const PORT = 3000;

app.listen( PORT, () => console.log (`server running on port ${PORT}`));

