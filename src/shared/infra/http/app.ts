import 'reflect-metadata';
import express from 'express';

import { router } from './routes';
import 'dotenv/config';
import cors from 'cors';

import '@shared/adapters';
import '@shared/container';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.use(router);

export { app };
