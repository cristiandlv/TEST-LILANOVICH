import { Router } from 'express';
import { getUsers, getUser, registerUser, loginUser, deleteUser } from '../controllers/usersControllers';

const router = Router();

// Definición de las rutas
router.get('/', getUsers);
router.get('/:id', getUser);
router.post('/register', registerUser);
router.post('/login', loginUser);
router.delete('/:id', deleteUser);

export default router;
