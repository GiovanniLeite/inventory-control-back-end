import { Router } from 'express';
import categoryController from '../controllers/CategoryController';

import loginRequired from '../middlewares/loginRequired';

const router = new Router();

router.get('/', categoryController.index);
router.get('/:id1&:id2&:id3', categoryController.index);
router.get('/category-list', categoryController.indexZ);
router.post('/', loginRequired, categoryController.store);
router.put('/:id', loginRequired, categoryController.update);
router.get('/:id', categoryController.show);
router.delete('/:id', loginRequired, categoryController.delete);

export default router;
