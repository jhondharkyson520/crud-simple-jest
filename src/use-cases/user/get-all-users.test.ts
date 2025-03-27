import { v4 as uuidv4 } from 'uuid';
import { CreateUser } from './create';
import { UserRepository } from '../../infrastructure/repositories/user-repository';
import { GetAllUsers } from './get-all-users';

const fakeUserRepository: UserRepository = {
    create: jest.fn(),
    findAll: jest.fn().mockResolvedValue([
        { id: uuidv4(), name: "John Doe", email: "john@example.com" }
    ]),
    update: jest.fn(),
    delete: jest.fn()
};

describe("GetAllUsers Use Case", () => {
    it("should return a list of users with valid data", async () => {
        const getUser = new GetAllUsers(fakeUserRepository);
        const users = await getUser.execute();

        expect(users).toBeInstanceOf(Array);
        expect(users.length).toBeGreaterThan(0);
        expect(users[0]).toHaveProperty("id");
        expect(users[0].name).toBe("John Doe");
        expect(users[0].email).toBe("john@example.com");
    });
});
