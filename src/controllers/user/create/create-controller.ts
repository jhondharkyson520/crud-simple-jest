import { NextFunction, Request, RequestHandler, Response } from "express";
import { CreateUser } from "../../../use-cases/user/create/create";

type CreateBody = {
    name?: string;
    email?: string;
}

export const createUserController = (createUser: CreateUser): RequestHandler => {
    return async (req: Request<{}, {}, CreateBody>, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { name, email } = req.body;
            if (!name || !email) {
                res.status(400).json({ error: 'Name and email are required' });
                return;
            }

            const user = await createUser.execute(name, email);
            res.status(201).json(user);
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    };
};
