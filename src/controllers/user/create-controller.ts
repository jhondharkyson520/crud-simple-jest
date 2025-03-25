import { Request, Response } from "express";
import { PrismaUserRepository } from "../../infrastructure/repositories/prisma-user-repository";
import { CreateUser } from "../../use-cases/user/create";

const prismaUserRepository = new PrismaUserRepository();
const createUser = new CreateUser(prismaUserRepository);

export const createUserController = async (req: Request, res: Response): Promise<Response> => {
    try {
        const {name, email} = req.body;
        const user = await createUser.execute(name, email);
        return res.status(201).json(user);
    } catch (error) {
        console.error(error);
        return res.status(500).json({error: 'Internal Server Error'});
        
    }
}
