import { Router } from 'express';
import ItemCategoryController from '../controllers/ItemCategoryController';

import loginRequired from '../middlewares/loginRequired';

const router = new Router();

// router.get('/', ItemCategoryController.index);
router.get('/:idCategory&:idCatParent&:idCatParentParent', ItemCategoryController.index);
router.post('/', loginRequired, ItemCategoryController.store);
router.put('/:id', loginRequired, ItemCategoryController.update);
router.get('/:id', ItemCategoryController.show);
router.delete('/:id', loginRequired, ItemCategoryController.delete);

export default router;
