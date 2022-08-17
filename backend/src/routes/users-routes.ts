import { IRouter } from 'express';
import express from 'express';

import verifyUser from '../middlewares/verifyUser';

import * as userHandleFunctions from './../controllers/users-controllers';

const router: IRouter = express.Router();

router.get('/:id/logout', verifyUser, userHandleFunctions.logout);

router.get('/:id', verifyUser, userHandleFunctions.findUser);

router.post('/new', userHandleFunctions.newUser);

router.post('/:id/refresh-token', userHandleFunctions.refreshToken);

router.post('/login', userHandleFunctions.login);

router.delete('/:id/delete', verifyUser, userHandleFunctions.deleteUser);

export default router;
