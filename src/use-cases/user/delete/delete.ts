import { User } from "../../../entities/user";
import { UserRepository } from "../../../infrastructure/repositories/user-repository";

export class DeleteUser {
    constructor(private userRepository: UserRepository) {};
    async execute(id: string): Promise<User> {
        if(!id) {
            throw new Error('Id is required for delete user');
        }
        try{
            const user = await this.userRepository.delete(id);
            return user;
        } catch(error) {
            throw new Error('Error delete user');
        }
    }
}
