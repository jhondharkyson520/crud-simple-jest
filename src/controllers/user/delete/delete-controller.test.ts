import { Request, RequestHandler, Response } from "express";
import { DeleteUser } from "../../../use-cases/user/delete/delete";
import { deleteUserController } from "./delete-controller";
import { User } from "../../../entities/user";
import { ParsedQs } from "qs";

describe('deleteUserController', () => {
    type DeleteParams = { id: string };
    
    let mockRequest: Partial<Request<DeleteParams, User, ParsedQs, Record<string, any>>>;
    let mockResponse: Partial<Response<User, Record<string, any>>>;
    let mockDeleteUserInstance: jest.Mocked<DeleteUser>;
    
    let controller: RequestHandler<DeleteParams, User>;

    beforeEach(() => {
        mockRequest = {
            params: {id: '1'},
        };
        mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        mockDeleteUserInstance = {
            execute: jest.fn(),
        } as unknown as jest.Mocked<DeleteUser>;

        controller = deleteUserController(mockDeleteUserInstance);
    });

    it('Return 200 and  user deleted', async () => {
        const mockUser = {id: '1', name: 'John Doe', email: 'johndoe@gmail.com'};
        mockDeleteUserInstance.execute.mockResolvedValue(mockUser);

        await controller(mockRequest as Request<DeleteParams, User, ParsedQs, Record<string, any>>, mockResponse as Response, jest.fn());
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith(mockUser);
        expect(mockDeleteUserInstance.execute).toHaveBeenCalledWith('1');
    });

    it('Return 500 in error cases', async () => {
        mockDeleteUserInstance.execute.mockRejectedValue(new Error('Error ao deletar user'));
        await controller(mockRequest as Request<DeleteParams, User, ParsedQs, Record<string, any>>, mockResponse as Response, jest.fn());
        expect(mockResponse.status).toHaveBeenCalledWith(500);
        expect(mockResponse.json).toHaveBeenCalledWith({error: 'Internal Server Error'})
    });
});
