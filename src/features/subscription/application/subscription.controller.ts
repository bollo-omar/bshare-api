import asyncHandler from 'express-async-handler';
import { Request, Response } from 'express';
import { RegisterSubscriptionService } from './use-cases/registerSubscription';
import { CreateSubscriptionDto } from '../domain/models/ISubscription';
import { STATUS } from '../../../utils/constants';

export const registerSubscription = asyncHandler(async (request: Request, response: Response) => {

    const {
        subscriptionType,
        endDate,
    } = request.body;

    const userId = request.user.id
    const payload: CreateSubscriptionDto = { userId, subscriptionType, endDate: new Date(endDate), startDate: new Date(), isActive: true }

    const subcriptionService = new RegisterSubscriptionService(payload);
    const subscription = await subcriptionService.execute();

    if (subscription.STATUS === STATUS.FAILURE) {
        response.status(400)
        throw new Error(subscription.MESSAGE)
    }
    response.status(201).json(subscription)

})