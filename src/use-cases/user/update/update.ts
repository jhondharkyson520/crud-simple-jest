import { User } from "../../../entities/user";
import { UserRepository } from "../../../infrastructure/repositories/user-repository";

export class UpdateUser {
    constructor(private userRepository: UserRepository) {};

    async execute(id: string, data: {name?: string, email?: string}): Promise<User> {
        if(!id){
            throw new Error('Id is required for update user');
        }

        try {
            const user = await this.userRepository.update(id, data);
            return user;
        } catch(error) {
            throw new Error('Error update user');
        }
    }
}
