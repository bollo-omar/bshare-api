import { IBaseRouter } from '@/utils/models/base.route';
import { Router } from 'express';
import { REGISTERSUBSCRIPTION } from './routes';
import { registerSubscription } from './subscription.controller';
import { authenticated } from '@/features/middleware/auth.middleware';

export class SubscriptionRouter implements IBaseRouter {
    router: Router = Router()

    constructor() {
        this.router.route(REGISTERSUBSCRIPTION).post(authenticated, registerSubscription)
    }
}