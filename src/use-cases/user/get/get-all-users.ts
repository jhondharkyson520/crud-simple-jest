import { User } from "../../../entities/user";
import { UserRepository } from "../../../infrastructure/repositories/user-repository";

export class GetAllUsers {
    constructor(private userRepository: UserRepository){}

    async execute(): Promise<User[]> {
        try {
            const user = await this.userRepository.findAll();
            return user;
        } catch(error) {
            //console.error("Error create user user cases: ", error);            
            throw new Error('Error get All users');
        }
    }
}