import { Request, Response } from "express";
import { DeleteUser } from "../../../use-cases/user/delete/delete";

export const deleteUserController = (deleteUser: DeleteUser) => {
    return async (req: Request, res: Response): Promise<Response> => {
        try{
            const {id} = req.params;
            const userDelete = await deleteUser.execute(id);
            return res.status(200).json(userDelete);
        } catch(error) {
            return res.status(500).json({error: 'Internal Server Error'})
        }
    }
}
