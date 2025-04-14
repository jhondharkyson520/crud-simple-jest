import { Request, RequestHandler, Response } from "express";
import { UpdateUser } from "../../../use-cases/user/update/update";
import { User } from "../../../entities/user";

type UpdateParams = {id: string};
type UpdateBody = {
    data: {
        name?: string;
        email?: string;
    }
}

export const updateUserController = (updateUser: UpdateUser): RequestHandler<UpdateParams, User, UpdateBody> => {
    return async (req: Request<UpdateParams, User, UpdateBody>, res: Response) => {
        const {id}= req.params;
        const {data} = req.body;

        try{            
            const userUpdate = await updateUser.execute(id, data);
            res.status(200).json(userUpdate);
        } catch(error) {
            res.status(500).json({error: 'Internal Server Error'});
        }
    }
}
