import { Request, Response } from "express";
import { GetAllUsers } from "../../../use-cases/user/get/get-all-users";

export const getAllUsersController = (getAllUsers: GetAllUsers) => {
    return async (req: Request, res: Response): Promise<Response> => {
        try {
            const user = await getAllUsers.execute();
            //console.log('List of user:', user);
            return res.status(201).json({
                sucess: 'Users list',
                user
            });
        } catch (error) {
            //console.error(error);
            return res.status(500).json({error: 'Internal Server Error'});
            
        }
    }
}
