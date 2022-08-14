import { IRouter } from 'express';
import express from 'express';

import verifyUser from '../middlewares/verifyUser';

import * as userHandleFunctions from './../controllers/users-controllers';

const router: IRouter = express.Router();

router.get('/:id', userHandleFunctions.findUser);

router.post('/new', userHandleFunctions.newUser);

router.delete('/:id/delete', verifyUser, userHandleFunctions.deleteUser);

export default router;
