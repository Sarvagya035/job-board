import { Router } from 'express'
import { UsersController } from './users.controller'

const usersRouter: Router = Router()

const usersControllerInstance = new UsersController();

usersRouter.get('/', usersControllerInstance.index)
usersRouter.post('/', usersControllerInstance.store)
usersRouter.put('/:id', usersControllerInstance.update)
usersRouter.delete('/:id', usersControllerInstance.delete)


export { usersRouter }