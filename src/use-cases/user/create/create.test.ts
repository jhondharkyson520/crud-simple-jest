import { v4 as uuidv4 } from 'uuid';
import { CreateUser } from './create';
import { UserRepository } from '../../../infrastructure/repositories/user-repository';

const fakeUserRepository: UserRepository = {
    create: jest.fn().mockImplementation(async (user) => ({id: uuidv4(), ...user})),
    findAll: jest.fn(),
    update: jest.fn(),
    delete: jest.fn()
};

describe("CreateUser Use Case", () => {
    it("should create a user with valid data", async () => {
        const createUser = new CreateUser(fakeUserRepository);
        const user = await createUser.execute("John Doe", "john@example.com");

        expect(user).toHaveProperty("id");
        expect(user.name).toBe("John Doe");
        expect(user.email).toBe("john@example.com");
    });
});
