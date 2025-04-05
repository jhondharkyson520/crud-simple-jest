import { UserRepository } from "../../../infrastructure/repositories/user-repository";
import { UpdateUser } from "./update";

const fakeUserRepository: UserRepository = {
    create: jest.fn(),
    findAll: jest.fn(),
    update: jest.fn().mockResolvedValue({id: '1', name: 'John Doe', email: 'johndoe@gmail.com'}),
    delete: jest.fn()
};

describe('UpdateUser Use Case', () => {
    it('should update a user', async () => {
        const updateUser = new UpdateUser(fakeUserRepository);
        const user = await updateUser.execute('1', {name: 'Name update'});

        expect(user).toEqual({id: '1', name: 'John Doe', email: 'johndoe@gmail.com'});
        expect(fakeUserRepository.update).toHaveBeenCalledWith('1', { name: 'Name update' });
    })
});
