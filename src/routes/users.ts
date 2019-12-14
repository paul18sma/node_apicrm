import { Router } from "express";
import { getUsers, getUserById, createUser, deleteUser, updateUser } from "../controllers/users.controller";

const router = Router();

router.get('/users', getUsers);
router.get('/users/:id', getUserById);
router.post('/users', createUser);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);


export default router;