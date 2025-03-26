import { User } from "../../entities/user";
import { UserRepository } from "../../infrastructure/repositories/user-repository";
import { v4 as uuidv4 } from 'uuid';

export class CreateUser {
    constructor(private userRepository: UserRepository) {};
    async execute(name: string, email: string): Promise<User>{
        if(!name || !email) {
            throw new Error('Name and email are required');
        }
       
        try {
            const user = await this.userRepository.create({id: uuidv4(), name, email});
            return user;
        } catch(error) {
            //console.error("Error create user user cases: ", error);            
            throw new Error('Error creating user');
        }
    }
}