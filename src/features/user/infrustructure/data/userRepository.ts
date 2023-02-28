import { IUser, CreateUserDto } from '../../domain/models/IUser';
import { IUserRepository } from './IUserRepository';
import { db } from '@/utils/database/db';
import { hash } from 'bcryptjs'

export class UserRepository implements IUserRepository {

    async findUserByEmail(email: string): Promise<IUser | null> {
        return db.user.findUnique({
            where: {
                email
            }
        })
    }

    async create(payload: CreateUserDto): Promise<IUser> {
        const data = {
            firstName: payload.firstName,
            lastName: payload.lastName,
            email: payload.email,
            role: payload.role,
            passwordHash: await hash(payload.password, 10)
        }
        return db.user.create({
            data
        })
    }

    findById(id: string): Promise<IUser | null> {
        return db.user.findUnique({
            where: {
                id
            }
        })
    }

    async findAll(): Promise<IUser[]> {
        return db.user.findMany({
            where: {
                role: "USER"
            }
        });
    }

    async update(id: string, payload: Partial<CreateUserDto>): Promise<IUser> {
        return db.user.update({
            data: payload,
            where: {
                id
            }
        })
    }

    async delete(id: string): Promise<void> {
        await db.user.delete({
            where: {
                id
            }
        })
    }

}