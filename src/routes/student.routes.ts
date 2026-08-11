import { Router } from 'express';
import { create, getAll, getOne, update, remove } from '../controllers/student.controller.js';

const router = Router();

router.post('/', create);
router.get('/', getAll);
router.get('/:id', getOne);
router.put('/:id', update);
router.delete('/:id', remove);

export default router;