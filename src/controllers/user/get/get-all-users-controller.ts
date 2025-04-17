import { NextFunction, Request, RequestHandler, Response } from "express";
import { GetAllUsers } from "../../../use-cases/user/get/get-all-users";
import { ErrorResponse, SuccessResponse } from "../../../types/http";
import { User } from "../../../entities/user";

export const getAllUsersController = (getAllUsers: GetAllUsers): RequestHandler =>
  async ( req: Request, res: Response<SuccessResponse<User[]> | ErrorResponse>, next: NextFunction): Promise<void> => {
    try {
        const users = await getAllUsers.execute();    
        const response: SuccessResponse<User[]> = {
            success: "Users list retrieved successfully",
            data: users,
        };

        res.status(200).json(response);
    } catch(error) {      
        const errResponse: ErrorResponse = {
            error: "Internal Server Error",
        };

        res.status(500).json(errResponse);
        next(error);
        //console.error("GetAllUsers Error:", error);
    }
};
