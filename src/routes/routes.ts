import { Request, Response, Router } from "express";
import { createUserController } from "../controllers/user/create-controller";
import { CreateUser } from "../use-cases/user/create";
import { PrismaUserRepository } from "../infrastructure/repositories/prisma-user-repository";

const prismaUserRepository = new PrismaUserRepository();

const createUser = new CreateUser(prismaUserRepository);
const createUserHandler = createUserController(createUser);

const routes = Router();
routes.use('/create', async (req: Request, res: Response) => {
    await createUserHandler;
});

export default routes;
