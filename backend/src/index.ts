import 'dotenv/config';
import express from 'express';
import { connectDB } from './db';
import taskRoutes from './routes/task.routes';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/api/tasks', taskRoutes);

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

connectDB()
  .then(() => {
    app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB:', err);
    process.exit(1);
  });
