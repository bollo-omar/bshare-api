import { CreateSubscriptionDto } from './../../domain/models/ISubscription';
import { ISubscriptionRepository } from '../../infrastructure/data/ISubscription.repository';
import { SubscriptionRepository } from '../../infrastructure/data/subscriptions.repository';
import { IRessponse } from '@/utils/models/response';
import { STATUS } from '@/utils/constants';

export class RegisterSubscriptionService {
    private subscriptionRepository: ISubscriptionRepository;
    private readonly payload: CreateSubscriptionDto;

    constructor(payload: CreateSubscriptionDto) {
        this.subscriptionRepository = new SubscriptionRepository();
        this.payload = payload
    }

    async execute(): Promise<IRessponse> {
        try {
            const isActive = await this.subscriptionRepository.checkActiveSubscription(this.payload.userId);

            if (isActive) {
                return {
                    STATUS: STATUS.FAILURE,
                    MESSAGE: "you already have active subscription"
                }
            }
            const subscription = await this.subscriptionRepository.create(this.payload);

            return {
                STATUS: STATUS.SUCCESS,
                MESSAGE: "subscription successful",
                DATA: subscription
            }
        } catch (error: any) {
            return {
                STATUS: STATUS.FAILURE,
                MESSAGE: "oops! something went wrong, try again"
            }
        }
    }
}