import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser'
import main from './routes/main.router.js';

const app = express(JSON)

app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use('/api/v1',main);

export default app 