import { Request, Response } from "express";
import { PrismaUserRepository } from "../../infrastructure/repositories/prisma-user-repository";
import { CreateUser } from "../../use-cases/user/create";



export const createUserController = (createUser: CreateUser) => {
    return async (req: Request, res: Response): Promise<Response> => {
        try {
            const {name, email} = req.body;
            //console.log('Received data:', { name, email });
            const user = await createUser.execute(name, email);
            //console.log('Created user:', user);
            return res.status(201).json(user);
        } catch (error) {
            //console.error(error);
            return res.status(500).json({error: 'Internal Server Error'});
            
        }
    }
    
} 