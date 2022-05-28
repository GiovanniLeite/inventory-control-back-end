import { Router } from 'express';
import itemController from '../controllers/ItemController';

import loginRequired from '../middlewares/loginRequired';

const router = new Router();

router.get('/', itemController.index); // all items
router.get('/name/:name', itemController.index); // alfabetic list
// router.get('/category/:idCategory', itemController.index); // alfabetic list
router.get('/categories/:idMainCategory&:idSub1Category&:idSub2Category', itemController.index);
router.post('/', loginRequired, itemController.store);
router.put('/:id', loginRequired, itemController.update);
router.get('/:id', itemController.show);
router.delete('/:id', loginRequired, itemController.delete);

export default router;
