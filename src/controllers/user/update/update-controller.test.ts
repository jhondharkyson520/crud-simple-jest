import { Request, RequestHandler, Response } from "express";
import { UpdateUser } from "../../../use-cases/user/update/update";
import { updateUserController } from "./update-controller";
import { User } from "../../../entities/user";
import { ParsedQs } from "qs";
describe('updateUserController', () => {
    type UpdateParams = { id: string };
    type UpdateBody = {
        data: {
            name?: string;
            email?: string;
        }
    }


    let mockRequest: Partial<Request<UpdateParams, User, UpdateBody, ParsedQs, Record<string, any>>>;
    let mockResponse: Partial<Response<User, Record<string, any>>>;
    let mockUpdateUserInstance: jest.Mocked<UpdateUser>;

    let controller: RequestHandler<UpdateParams, User, UpdateBody>;

    beforeEach(() => {
        mockRequest = {
            params: { id: '1' },
            body: {
                data: {
                    name: "John Doe",
                    email: "johndoe@gmail.com"
                }
            }
        };
        mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        mockUpdateUserInstance = {
            execute: jest.fn().mockResolvedValue({
                id: '1',
                name: "John Doe",
                email: "johndoe@gmail.com"
            }),
        } as unknown as jest.Mocked<UpdateUser>;

        controller = updateUserController(mockUpdateUserInstance);
    });

    it('Return 200 and user updated', async () => {
        const mockUser = {
            id: '1', 
            name: 'John Doe Test', 
            email: 'johndoetest@gmail.com'
        }; //valor simulado para o updateUserInstance.execute retorne após o update (Ou seja resultado final da operação)

        mockUpdateUserInstance.execute.mockResolvedValue(mockUser); // simula que o execute() vai retornar esse mockUser

        mockRequest = {
            params: { id: '1' },
            body: {
                data: {
                    name: "John Doe Test",
                    email: "johndoetest@gmail.com"
                }
            }
        }; // aqui passa esses dados para função update

        await controller(mockRequest as Request<UpdateParams, User, UpdateBody, ParsedQs, Record<string, any>>, mockResponse as Response, jest.fn());
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith(mockUser);
        expect(mockUpdateUserInstance.execute).toHaveBeenCalledWith('1', {name: 'John Doe Test', email: 'johndoetest@gmail.com'}); // aqui a função deve receber os dados do mockRequest.body.data
        
    });

    it('Return 500 in error cases', async () => {
        mockUpdateUserInstance.execute.mockRejectedValue(new Error('Error ao atualizar user'));
        await controller(mockRequest as Request<UpdateParams, User, UpdateBody, ParsedQs, Record<string, any>>, mockResponse as Response, jest.fn());
        expect(mockResponse.status).toHaveBeenCalledWith(500);
        expect(mockResponse.json).toHaveBeenCalledWith({error: 'Internal Server Error'})
    });
});
