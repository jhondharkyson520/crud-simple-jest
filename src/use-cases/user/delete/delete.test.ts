import { UserRepository } from "../../../infrastructure/repositories/user-repository";
import { DeleteUser } from "./delete";

const fakeUserRepository: UserRepository = {
    create: jest.fn(),
    findAll: jest.fn(),
    update: jest.fn(),
    delete: jest.fn().mockResolvedValue({id: '1', name: 'John Doe', email: 'johndoe@gmail.com'}),
};


describe('DeleteUser Use Case', () => {
    it('should delete a user', async () => {
        const deleteUser = new DeleteUser(fakeUserRepository);
        const user = await deleteUser.execute('1');

        expect(user).toEqual({id: '1', name: 'John Doe', email: 'johndoe@gmail.com'});
        expect(fakeUserRepository.delete).toHaveBeenCalledWith('1');
    });

    it('should throw an error when id is not provided', async () => {
        const deleteUser = new DeleteUser(fakeUserRepository);
        await expect(deleteUser.execute('')).rejects.toThrow('Id is required for delete user');
    });
    
    it('should throw an error when repository fails', async () => {
        (fakeUserRepository.delete as jest.Mock).mockRejectedValueOnce(new Error('Database error'));
        const deleteUser = new DeleteUser(fakeUserRepository);      
        await expect(deleteUser.execute('1')).rejects.toThrow('Error delete user');   
    });    
});
