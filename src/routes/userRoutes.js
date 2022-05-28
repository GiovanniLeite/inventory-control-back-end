import { Router } from 'express';
import userController from '../controllers/UserController';

import loginRequired from '../middlewares/loginRequired';

const router = new Router();

// Não precisam existir
router.get('/', loginRequired, userController.index); // Lista usuarios
router.get('/:id', userController.show); // Lista usuario

//
router.post('/', userController.store); // loginRequired, userController.store);
router.put('/', loginRequired, userController.update);
router.delete('/', loginRequired, userController.delete);

export default router;

/*
  CRUD em cada controller ate 5 metodos
  store/create = cria = CREATE - POST
  index = lista = READ - GET
  update = atualiza = UPDATE - PATCH ou PUT
  delete = apaga = DELETE - DELETE
  show = mostra 1 registro - GET
*/
