import { Router } from 'express';

import { createUser, deleteUser, getAllUsers, updateUser } from '../controllers/users.controller';
import { validateRequest } from '../middleware/validateRequest';
import { UserValidator } from '../validators/users';
const router = Router();

router.get('/users/', getAllUsers);
router.post('/users/', validateRequest({ body: UserValidator }), createUser);
router.patch('/users/:id', validateRequest({ body: UserValidator }), updateUser);
router.delete('/users/:id', deleteUser);

export default router;
