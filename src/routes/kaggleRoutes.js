import { Router } from 'express';
import { login,createTask, deleteTask, taskStatus ,listTask } from '../controller/task.js';
import authMiddleware from '../middlewares/authMiddleware.js';
const router = Router();

router.post('/login',login);
router.post('/create',authMiddleware, createTask);
router.delete('/delete',authMiddleware, deleteTask);
router.get('/status',authMiddleware, taskStatus);
router.get('/list',authMiddleware,listTask)

export default router;
