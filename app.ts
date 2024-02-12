import * as dotenv from 'dotenv';
dotenv.config();

import './db';

import express from 'express';

const app = express();

import config from './config/config';

config(app);

import allRoutes from './routes/index.routes';
app.use("/api", allRoutes);

import auth from './routes/auth.routes';
app.use("/api/auth", auth);

export default app;
