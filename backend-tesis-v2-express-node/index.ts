// src/server/index.ts
import express, { Application } from 'express';
import cors from 'cors';

import authRoutes from './routes/auth';
import pymesRoutes from './routes/pymes';

const app: Application = express();
const PORT = 5003;

/* ──────────── Middlewares ──────────── */
app.use(cors());
app.use(express.json());

/* ───────────── Routes ───────────────── */
app.use('/auth', authRoutes);
app.use('/pymes', pymesRoutes);

/* ──────────── Start ─────────────── */
app.listen(PORT, () =>
  console.log(`Server is running on http://localhost:${PORT}`)
);
