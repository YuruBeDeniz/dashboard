import * as dotenv from 'dotenv';
dotenv.config();

import './db';

import express from 'express';

const app = express();


import allRoutes from './routes/index.routes';
app.use("/api", allRoutes);

export default app;
