import { IBaseRouter } from '@/utils/models/base.route';
import { Router } from 'express';
import { CHANGESUBSCRIPTION, GETUSERSUBSCRIPTION, REGISTERSUBSCRIPTION } from './routes';
import { changeSubscription, registerSubscription, getUserSubscription } from './subscription.controller';
import { authenticated } from '@/features/middleware/auth.middleware';

export class SubscriptionRouter implements IBaseRouter {
    router: Router = Router()

    constructor() {
        this.router.route(REGISTERSUBSCRIPTION).post(authenticated, registerSubscription);
        this.router.route(CHANGESUBSCRIPTION).patch(authenticated, changeSubscription)
        this.router.route(GETUSERSUBSCRIPTION).get(authenticated, getUserSubscription)
    }
}