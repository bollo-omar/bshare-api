import { IBaseModel } from '@/utils/models/base.model';
import { Contacts, UserRole } from '@prisma/client';

export interface CreateUserDto {
    firstName: string;
    lastName: string;
    role: UserRole;
    email: string;
    password: string;
    Contacts?: Contacts
}

export interface IUser extends IBaseModel {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: UserRole;
    passwordHash?: string | null;
    Contacts?: Contacts | null;
}