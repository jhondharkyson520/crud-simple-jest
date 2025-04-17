import { Request, Response, NextFunction, RequestHandler } from "express";
import { GetAllUsers } from "../../../use-cases/user/get/get-all-users";
import { getAllUsersController } from "./get-all-users-controller";
import { User } from "../../../entities/user";

describe("getAllUsersController", () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockNext: NextFunction;
  let mockGetAllUsersInstance: jest.Mocked<GetAllUsers>;
  let controller: RequestHandler;

  beforeEach(() => {
    mockRequest = {};
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    mockNext = jest.fn();
    mockGetAllUsersInstance = {
      execute: jest.fn(),
    } as unknown as jest.Mocked<GetAllUsers>;
    controller = getAllUsersController(mockGetAllUsersInstance);
  });

  it("deve retornar 200 e a lista de usuários", async () => {
    const mockUsers: User[] = [
      { id: "1", name: "Usuário 1", email: "user1@example.com" },
      { id: "2", name: "Usuário 2", email: "user2@example.com" },
    ];
    mockGetAllUsersInstance.execute.mockResolvedValue(mockUsers);

    await controller(mockRequest as Request, mockResponse as Response, mockNext);

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith({
      success: "Users list retrieved successfully",
      data: mockUsers,
    });
    expect(mockGetAllUsersInstance.execute).toHaveBeenCalled();
  });

  it("deve retornar 500 em caso de erro", async () => {
    const errorMessage = "Erro ao buscar usuários";
    mockGetAllUsersInstance.execute.mockImplementationOnce(() => {
      return Promise.reject(new Error(errorMessage));
    });

    await controller(mockRequest as Request, mockResponse as Response, mockNext);
    expect(mockNext).toHaveBeenCalledWith(expect.objectContaining({
      message: errorMessage,
    }));
  });
});
