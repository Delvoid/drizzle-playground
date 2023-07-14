import 'dotenv/config';
import express from 'express';
import type MessageResponse from './interfaces/MessageResponse';
import errorHandler from './middleware/errorHandler';
import notFound from './middleware/notFound';
import api from './routes/api.routes';

const app = express();

app.use(express.json());

app.get<Record<string, unknown>, MessageResponse>('/', (_, res) => {
  res.json({
    message: '👋🌎🚀',
  });
});

app.use('/api', api);

app.use(notFound);
app.use(errorHandler);

export default app;
