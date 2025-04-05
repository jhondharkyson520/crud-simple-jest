import { User } from "../../entities/user";
import { prisma } from "../database/prisma-client";
import { UserRepository } from "./user-repository";

export class PrismaUserRepository implements UserRepository {
    async create(user: User): Promise<User> {
        return await prisma.user.create({
            data: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        });
    }
    async findAll(): Promise<User[]> {
        return await prisma.user.findMany();
    }
    async update(id: string, data: {name?: string, email?: string}): Promise<User> {
        return await prisma.user.update({
            where: {id},
            data: {
                name: data.name,
                email: data.email
            }
        });
    }
    async delete(id: string): Promise<User> {
        return await prisma.user.delete({ where: {id} });
    }
}
