
import express from 'express';
import cors from 'cors';

import kaggleRoutes from './routes/kaggleRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());

// Mounting the kaggleRoutes under '/api' prefix
app.use('/api', kaggleRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

export default app;
