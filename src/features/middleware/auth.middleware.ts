import { NextFunction, Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import { IToken, verifyToken } from '../user/infrustructure/utils/token-generator';
import { FindUserByIdService } from '../user/application/use-cases/findUserById';
import { STATUS } from '../../utils/constants';
import { IUser } from '../user/domain/models/IUser';

export const authenticated = asyncHandler(async (request: Request, response: Response, next: NextFunction) => {
    const bearer = request.headers.authorization;

    if (!bearer || !bearer.startsWith('Bearer')) {
        response.status(401)
        throw new Error('Unauthorized')
    }

    const token = bearer.split('Bearer ')[1].trim();

    try {
        const payload: IToken | jwt.JsonWebTokenError = await verifyToken(token)
        if (payload instanceof jwt.JsonWebTokenError) {
            response.status(401)
            throw new Error('Unauthorized')
        }

        const userService = new FindUserByIdService(payload.id);
        const user = await userService.execute();

        if (user?.STATUS !== STATUS.SUCCESS) {
            response.status(401)
            throw new Error('Unauthorized');
        }

        const _user: IUser = {
            ...user.DATA as IUser
        }

        request.user = _user;
        next();

    } catch (error) {
        response.status(401)
        throw new Error('Unauthorized');
    }
})