import { Request, Response } from "express";
import { DeleteUser } from "../../../use-cases/user/delete/delete";
import { deleteUserController } from "./delete-controller";

describe('deleteUserController', () => {
    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;
    let mockDeleteUserInstance: jest.Mocked<DeleteUser>;
    
    let controller: (req: Request, res: Response) => Promise<Response>;

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

        await controller(mockRequest as Request, mockResponse as Response);
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith(mockUser);
        expect(mockDeleteUserInstance.execute).toHaveBeenCalledWith('1');
    });

    it('Return 500 in error cases', async () => {
        mockDeleteUserInstance.execute.mockRejectedValue(new Error('Error ao deletar user'));
        await controller(mockRequest as Request, mockResponse as Response);
        expect(mockResponse.status).toHaveBeenCalledWith(500);
        expect(mockResponse.json).toHaveBeenCalledWith({error: 'Internal Server Error'})
    });
});
