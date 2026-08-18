import { Router } from 'express';
import { create, getAll, getOne, update, remove } from '../controllers/student.controller.js';
import { authenticate } from '../middleware/authenticate.js';

const router = Router();

router.use(authenticate);

router.post('/', create);
router.get('/', getAll);
router.get('/:id', getOne);
router.put('/:id', update);
router.delete('/:id', remove);

export default router;