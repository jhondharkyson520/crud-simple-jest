import { Request, RequestHandler, Response } from "express";
import { DeleteUser } from "../../../use-cases/user/delete/delete";
import { User } from "../../../entities/user";

type DeleteParams = {id: string};

export const deleteUserController = (deleteUser: DeleteUser): RequestHandler<DeleteParams, User> => {
    return async (req: Request<DeleteParams, User>, res: Response) => {
        const {id} = req.params;
        try{            
            const userDelete = await deleteUser.execute(id);
            res.status(200).json(userDelete);
        } catch(error) {
            res.status(500).json({error: 'Internal Server Error'})
        }
    }
}
