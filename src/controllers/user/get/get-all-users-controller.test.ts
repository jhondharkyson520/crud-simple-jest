import { Request, Response } from "express";
import { GetAllUsers } from "../../../use-cases/user/get/get-all-users";
import { getAllUsersController } from "./get-all-users-controller";

describe("getAllUsersController", () => {
    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;
    let mockGetAllUsersInstance: jest.Mocked<GetAllUsers>;
    let controller: (req: Request, res: Response) => Promise<Response>;

    beforeEach(() => {
        mockRequest = {};

        mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        mockGetAllUsersInstance = {
            execute: jest.fn(),
        } as unknown as jest.Mocked<GetAllUsers>;

        controller = getAllUsersController(mockGetAllUsersInstance);
        jest.spyOn(console, 'log').mockImplementation(() => {});
    });

    it("deve retornar 200 e a lista de usuários", async () => {
        const mockUsers = [
            { id: "1", name: "Usuário 1", email: "user1@example.com" },
            { id: "2", name: "Usuário 2", email: "user2@example.com" },
        ];
        mockGetAllUsersInstance.execute.mockResolvedValue(mockUsers);

        await controller(mockRequest as Request, mockResponse as Response);

        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith({
            sucess: "Users list",
            user: mockUsers,
        });
        expect(mockGetAllUsersInstance.execute).toHaveBeenCalled();
    });

    it("deve retornar 500 em caso de erro", async () => {
        mockGetAllUsersInstance.execute.mockRejectedValue(new Error("Erro ao buscar usuários"));

        await controller(mockRequest as Request, mockResponse as Response);

        expect(mockResponse.status).toHaveBeenCalledWith(500);
        expect(mockResponse.json).toHaveBeenCalledWith({ error: "Internal Server Error" });
    });
});
