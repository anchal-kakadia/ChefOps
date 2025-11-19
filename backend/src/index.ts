import express, { Application } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import menuRoutes from './routes/menu.routes';
import { errorHandler } from './middleware/errorHandler';

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Routes
app.use('/api', menuRoutes);

// Error handling
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🍕 ChefOps Backend running on port ${PORT}`);
});

export default app;
