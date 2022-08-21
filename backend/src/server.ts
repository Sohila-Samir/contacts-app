export {};

require('dotenv').config();
import { Request, Response, Application } from 'express';

import express from 'express';
import cors from 'cors';
import path from 'path';
import multer from 'multer';

import contactsRoutes from './routes/contacts-routes';
import userRoutes from './routes/users-routes';
import authRoutes from './routes/auth-routes';

import connect from './config/database';

import errorHandler from './middlewares/error';

// start the application
connect();

const port: number | string = process.env.PORT || 2022;
const app: Application = express();

app.listen(port, () => {
	console.log(`running on port: ${port}`);
});

// multer config
const storage = multer.memoryStorage();
export const upload = multer({ storage: storage });

// serving static files
app.use(express.static(path.join(__dirname, 'uploads')));

// middlewares
app.use(cors());
app.use(express.json());

// using routes
app.use('/api/contacts', upload.single('contactAvatar'), contactsRoutes);
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);

// error handlers
app.get('*', (req: Request, res: Response) => {
	res.status(404).json({ success: false, err: '404, Page not found.' });
});

app.use(errorHandler);
