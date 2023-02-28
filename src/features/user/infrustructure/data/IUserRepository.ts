import { IBaseRepository } from "@/utils/repositories/base.repository";
import { CreateUserDto, IUser } from "../../domain/models/IUser";

export interface IUserRepository extends IBaseRepository<CreateUserDto, IUser> {
    findUserByEmail(email: string): Promise<IUser | null>;
}