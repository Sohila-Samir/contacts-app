export {};

require('dotenv').config();
import { Request, Response, Application, NextFunction } from 'express';

import express from 'express';
import cors from 'cors';
import path from 'path';
import multer from 'multer';
import connect from './config/database';

import contactsRoutes from './routes/contacts-routes';
import userRoutes from './routes/users-routes';

import ExpressError from './utils/ExpressError';

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
app.use('/api/contacts', upload.single('imgURL'), contactsRoutes);
app.use('/api/users', userRoutes);

// error handlers
app.get('*', (req: Request, res: Response) => {
	res.status(404).json({ success: false, err: '404, Page not found.' });
});

app.use(
	(
		err: Error | ExpressError,
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		console.log(`${err.message} | ${err.name}`);
		res.json({
			success: false,
			message: `${err.message} | ${err.name}`,
		});
	}
);
