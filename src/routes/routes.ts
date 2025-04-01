import { Request, Response, Router } from "express";
import { createUserController } from "../controllers/user/create/create-controller";
import { CreateUser } from "../use-cases/user/create/create";
import { PrismaUserRepository } from "../infrastructure/repositories/prisma-user-repository";
import { getAllUsersController } from "../controllers/user/get/get-all-users-controller";
import { GetAllUsers } from "../use-cases/user/get/get-all-users";

const prismaUserRepository = new PrismaUserRepository();

const createUser = new CreateUser(prismaUserRepository);
const createUserHandler = createUserController(createUser);
const getUsers = new GetAllUsers(prismaUserRepository);
const getAllUsersHandler = getAllUsersController(getUsers);

const routes = Router();

routes.post('/create', (req: Request, res: Response) => {
    createUserHandler(req, res);
});

routes.get('/all-users', (req: Request, res: Response) => {
    getAllUsersHandler(req, res);
})

export default routes;
