import { NextFunction, Request, RequestHandler, Response } from "express";
import { CreateUser } from "../../../use-cases/user/create/create";
import { createUserController } from "./create-controller";

describe("createUserController", () => {
    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;
    let mockNext: NextFunction;
    let mockCreateUserInstance: jest.Mocked<CreateUser>;
    let controller: RequestHandler

    beforeEach(() => {
        mockRequest = {
            body: { name: "Usuário de Teste", email: "teste@exemplo.com" },
        };

        mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        mockNext = jest.fn();

        mockCreateUserInstance = {
            execute: jest.fn(),
        } as unknown as jest.Mocked<CreateUser>;

        controller = createUserController(mockCreateUserInstance);
        jest.spyOn(console, "error").mockImplementation(() => {});
        jest.spyOn(console, "log").mockImplementation(() => {});
    });

    it("deve retornar 201 e o usuário criado", async () => {
        const mockUser = { id: "123", name: "Usuário de Teste", email: "teste@exemplo.com" };
        mockCreateUserInstance.execute.mockResolvedValue(mockUser);

        await controller(mockRequest as Request, mockResponse as Response, mockNext);

        expect(mockResponse.status).toHaveBeenCalledWith(201);
        expect(mockResponse.json).toHaveBeenCalledWith(mockUser);
        expect(mockCreateUserInstance.execute).toHaveBeenCalledWith("Usuário de Teste", "teste@exemplo.com");
    });

    it("deve retornar 400 se name ou email estiverem ausentes", async () => {
        mockRequest.body = {}; // sem name e email

        await controller(mockRequest as Request, mockResponse as Response, mockNext);

        expect(mockResponse.status).toHaveBeenCalledWith(400);
        expect(mockResponse.json).toHaveBeenCalledWith({ error: "Name and email are required" });
    });

    it("deve retornar 500 em caso de erro", async () => {
        mockCreateUserInstance.execute.mockRejectedValue(new Error("Erro ao criar usuário"));

        await controller(mockRequest as Request, mockResponse as Response, mockNext);

        expect(mockResponse.status).toHaveBeenCalledWith(500);
        expect(mockResponse.json).toHaveBeenCalledWith({ error: "Internal Server Error" });
    });
});
