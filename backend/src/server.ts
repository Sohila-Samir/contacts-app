export {};

require('dotenv').config();
import { Request, Response, Application, NextFunction } from 'express';
import express from 'express';
import cors from 'cors';
import path from 'path';
import multer from 'multer';
import connect from './config/database';
import contactsRoutes from './routes/contacts-routes';
import session, { SessionOptions } from 'express-session';
import mongoStore from 'connect-mongo';
import ExpressError from './utils/ExpressError';

// start the application
const connection = connect();
const port: number | string = process.env.PORT || 2022;
const app: Application = express();

app.listen(port, () => {
	console.log(`running on port: ${port}`);
});

// variables
const sessionOptions = {
	secret: 'thisisnotvalidsecret',
	resave: false,
	saveUninitialized: true,
	httpOnly: true,
	store: mongoStore.create({ clientPromise: connection, dbName: 'contacts' }),
};

// config session
app.use(session(sessionOptions as unknown as SessionOptions));

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
		console.log(`ERROR WAS CAUGHT: ${err.message} | ${err.name}`);
		res.json({
			success: false,
			message: `ERROR WAS CAUGHT: ${err.message} | ${err.name}`,
		});
	}
);
