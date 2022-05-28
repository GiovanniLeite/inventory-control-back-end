import { Router } from 'express';
import fotoVideoController from '../controllers/FotoVideoController';

import loginRequired from '../middlewares/loginRequired';

const router = new Router();

router.post('/', loginRequired, fotoVideoController.store);

export default router;
