import { NextFunction, Request, Response } from "express";
import { STATUS } from '../../utils/constants';

interface StatusError extends Error {
    status?: number;
}

export const notFoundErrorHandler = async (request: Request, response: Response, next: NextFunction) => {

    const error = new Error(`${request.method} ${request.originalUrl} not found`) as StatusError;
    error['status'] = 404;

    next(error);
}

export const globalErrorHandler = async (
    error: StatusError,
    request: Request,
    response: Response,
    next: NextFunction
) => {

    const statusCode: number = response.statusCode ? response.statusCode : 500;

    response.status((error['status'] || statusCode))
    response.json({
        STATUS: STATUS.FAILURE,
        MESSAGE: error.message
    });
}