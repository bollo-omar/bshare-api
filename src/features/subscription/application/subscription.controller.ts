import asyncHandler from 'express-async-handler';
import { Request, Response } from 'express';
import { RegisterSubscriptionService } from './use-cases/registerSubscription';
import { CreateSubscriptionDto } from '../domain/models/ISubscription';
import { STATUS } from '../../../utils/constants';
import { ChangeSubscriptionService } from './use-cases/changeSubscription';
import { GetUserSubscriptionService } from './use-cases/getUserSubscription';

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

export const changeSubscription = asyncHandler(async (request: Request, response: Response) => {

    if (request.params.userId !== request.user.id) {
        response.status(400)
        throw new Error("unauthorized")
    }

    const payload = { subscriptionType: request.body.subscriptionType };

    const changeSubscriptionService = new ChangeSubscriptionService(request.params.id, request.params.userId, payload)

    const subscription = await changeSubscriptionService.execute()

    if (subscription.STATUS === STATUS.FAILURE) {
        response.status(400)
        throw new Error(subscription.MESSAGE)
    }
    response.status(201).json(subscription)
})

export const getUserSubscription = asyncHandler(async (request: Request, response: Response) => {
    const userId = request.params.userId;

    const getUserSubscriptionService = new GetUserSubscriptionService(userId);
    const subscription = await getUserSubscriptionService.execute();

    if (!subscription?.DATA) {
        response.status(200)
        throw new Error(subscription.MESSAGE)
    }

    response.status(200).json(subscription)

})