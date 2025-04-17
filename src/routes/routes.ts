import { Request, Response, Router } from "express";
import { createUserController } from "../controllers/user/create/create-controller";
import { CreateUser } from "../use-cases/user/create/create";
import { PrismaUserRepository } from "../infrastructure/repositories/prisma-user-repository";
import { getAllUsersController } from "../controllers/user/get/get-all-users-controller";
import { GetAllUsers } from "../use-cases/user/get/get-all-users";
import { DeleteUser } from "../use-cases/user/delete/delete";
import { deleteUserController } from "../controllers/user/delete/delete-controller";
import { UpdateUser } from "../use-cases/user/update/update";
import { updateUserController } from "../controllers/user/update/update-controller";
import { NextFunction } from "express-serve-static-core";

const prismaUserRepository = new PrismaUserRepository();

const createUser = new CreateUser(prismaUserRepository);
const createUserHandler = createUserController(createUser);

const getUsers = new GetAllUsers(prismaUserRepository);
const getAllUsersHandler = getAllUsersController(getUsers);

const deleteUser = new DeleteUser(prismaUserRepository);
const deleteUserHandler = deleteUserController(deleteUser);

const updateUser = new UpdateUser(prismaUserRepository);
const updateUserHandler = updateUserController(updateUser);

const routes = Router();

routes.post('/create', (req: Request, res: Response, next: NextFunction) => {
    createUserHandler(req, res, next);
});

routes.get('/all-users', (req: Request, res: Response, next: NextFunction) => {
    getAllUsersHandler(req, res, next);
});

routes.delete('/delete/:id', (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    deleteUserHandler(req, res, next);
});


routes.put('/update/:id', (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    updateUserHandler(req, res, next);
});


export default routes;
