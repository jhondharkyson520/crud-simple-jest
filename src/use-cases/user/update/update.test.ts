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
    });

    it('should throw an error when id is not provided', async () => {
        const updateUser = new UpdateUser(fakeUserRepository);
        await expect(updateUser.execute('', {})).rejects.toThrow('Id is required for update user');
    });

    it('should throw an error when repository fails', async () => {
        (fakeUserRepository.update as jest.Mock).mockRejectedValueOnce(new Error('Database error'));
        const updateUser = new UpdateUser(fakeUserRepository);
        await expect(updateUser.execute('1', {name: 'Test'})).rejects.toThrow('Error update user');
    });
});
