import { Request, Response } from "express";
import { CreateUser } from "../../../use-cases/user/create/create";
import { createUserController } from "./create-controller";

describe("createUserController", () => {
    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;
    let mockCreateUserInstance: jest.Mocked<CreateUser>;
    let controller: (req: Request, res: Response) => Promise<Response>;

    beforeEach(() => {
        mockRequest = {
            body: { name: "Usuário de Teste", email: "teste@exemplo.com" },
        };

        mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        mockCreateUserInstance = {
            execute: jest.fn(),
        } as unknown as jest.Mocked<CreateUser>;

        controller = createUserController(mockCreateUserInstance);
        jest.spyOn(console, 'error').mockImplementation(() => {});
        jest.spyOn(console, 'log').mockImplementation(() => {});
    });

    it("deve retornar 201 e o usuário criado", async () => {
        const mockUser = { id: "123", name: "Usuário de Teste", email: "teste@exemplo.com" };
        mockCreateUserInstance.execute.mockResolvedValue(mockUser);

        await controller(mockRequest as Request, mockResponse as Response);

        expect(mockResponse.status).toHaveBeenCalledWith(201);
        expect(mockResponse.json).toHaveBeenCalledWith(mockUser);
        expect(mockCreateUserInstance.execute).toHaveBeenCalledWith("Usuário de Teste", "teste@exemplo.com");
    });

    it("deve retornar 500 em caso de erro", async () => {
        mockCreateUserInstance.execute.mockRejectedValue(new Error("Erro ao criar usuário"));

        await controller(mockRequest as Request, mockResponse as Response);

        expect(mockResponse.status).toHaveBeenCalledWith(500);
        expect(mockResponse.json).toHaveBeenCalledWith({ error: "Internal Server Error" });
    });
});
