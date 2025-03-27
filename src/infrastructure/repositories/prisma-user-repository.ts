import { User } from "../../entities/user";
import { prisma } from "../database/prisma-client";
import { UserRepository } from "./user-repository";

export class PrismaUserRepository implements UserRepository {
    async create(user: User): Promise<User> {
        return await prisma.user.create({
            data: user
        });
    }
    async findAll(): Promise<User[]> {
        return await prisma.user.findMany();
    }
    update(id: string, data: Partial<User>): Promise<User> {
        throw new Error("Method not implemented.");
    }
    delete(id: string): Promise<User> {
        throw new Error("Method not implemented.");
    }
}
