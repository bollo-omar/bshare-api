import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { CreateUserService } from './use-cases/createUser';
import { STATUS } from '@/utils/constants';
import { createUserValidation, loginValidation } from './use-cases/validation';
import { UpdateUserContactsService } from "./use-cases/updateUserContacts";
import { LoginService } from './use-cases/loginUser';
import { UserRole } from "@prisma/client";
import { FindUserByIdService } from "./use-cases/findUserById";
import { UpdateUserService } from "./use-cases/updateUser";
import { FindAllUsersService } from "./use-cases/findAllUsers";
import logger from '../../logging/logger';

export const registerUser = asyncHandler(async (request: Request, response: Response) => {
    const errors: string[] = createUserValidation(request.body);
    if (errors.length > 0) {
        response.status(400)
        throw new Error(errors[0])
    }

    const payload = request.body;
    const createUserService = new CreateUserService({ ...payload, role: UserRole.USER });
    const user = await createUserService.execute();

    if (user.STATUS === STATUS.FAILURE) {
        response.status(400)
        throw new Error(user.MESSAGE)
    }

    response.status(201).json(user)
})

export const login = asyncHandler(async (request: Request, response: Response) => {

    const errors: string[] = loginValidation(request.body);

    if (errors.length > 0) {
        response.status(400)
        throw new Error(errors[0])
    }

    const { email, password } = request.body;
    const loginService = new LoginService(email, password);
    const user = await loginService.execute()

    if (!user?.DATA) {
        response.status(400)
        throw new Error(user.MESSAGE)
    }

    response.status(200).json(user)

})

export const updateUser = asyncHandler(async (request: Request, response: Response) => {
    const id = request.params.id;
    const payload = request.body;

    if (request.user.id !== request.params.id) {
        response.status(401)
        throw new Error("Unauthorized")
    }
    const updateUserService = new UpdateUserService(id, payload);

    const user = await updateUserService.execute();

    if (user.STATUS === STATUS.FAILURE) {
        response.status(400)
        throw new Error(user.MESSAGE)
    }
    response.status(201).json(user)
})

export const updateUserContacts = asyncHandler(async (request: Request, response: Response) => {
    const payload = { Contacts: request.body }

    if (request.user.id !== request.params.id) {
        response.status(401)
        throw new Error("Unauthorized")
    }
    const updateUserAddressService = new UpdateUserContactsService(request.params.id, payload)
    const user = await updateUserAddressService.execute();

    if (user.STATUS === STATUS.FAILURE) {
        response.status(400)
        throw new Error(user.MESSAGE)
    }

    response.status(201).json(user)
})

export const getUserById = asyncHandler(async (request: Request, response: Response) => {
    const id = request.params.id;

    if (id !== request.user.id) {
        response.status(401)
        throw new Error("Unauthorized")
    }
    const findUserByIdService = new FindUserByIdService(id);
    const user = await findUserByIdService.execute();

    if (user.STATUS === STATUS.FAILURE) {
        response.status(400)
        throw new Error(user.MESSAGE)
    }
    response.status(200).json(user)
})

export const listAllUsers = asyncHandler(async (request: Request, response: Response) => {
    if (request.user.role !== "ADMIN") {
        response.status(401)
        throw new Error("Unauthorized")
    }
    const findAllUsersService = new FindAllUsersService();
    const users = await findAllUsersService.execute();

    if (users.STATUS === STATUS.FAILURE) {
        response.status(400)
        throw new Error(users.MESSAGE)
    }
    response.status(200).json(users)
});

export const profile = asyncHandler(async (request: Request, response: Response) => {

    logger.debug(`getProfile`)
    response.status(200).json(request.user)
})