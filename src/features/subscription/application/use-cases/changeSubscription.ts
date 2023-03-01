import { IRessponse } from "@/utils/models/response";
import { CreateSubscriptionDto } from "../../domain/models/ISubscription";
import { ISubscriptionRepository } from "../../infrastructure/data/ISubscription.repository";
import { SubscriptionRepository } from '../../infrastructure/data/subscriptions.repository';
import { STATUS } from '@/utils/constants';
import logger from '@/features/logging/logger';

export class ChangeSubscriptionService {
    private readonly subscriptionRepository: ISubscriptionRepository;
    private readonly payload: Partial<CreateSubscriptionDto>
    private readonly id: string;
    private readonly userId: string;

    constructor(id: string, userId: string, payload: {}) {
        this.subscriptionRepository = new SubscriptionRepository()
        this.payload = payload;
        this.id = id;
        this.userId = userId;

    }

    async execute(): Promise<IRessponse> {
        try {
            const subscription = await this.subscriptionRepository.update(this.id, this.payload)
            return {
                STATUS: STATUS.SUCCESS,
                MESSAGE: "your subscription has been updated successfully",
                DATA: subscription
            }
        } catch (error: any) {
            logger.debug(error.message)
            return {
                STATUS: STATUS.FAILURE,
                MESSAGE: "oops! something went wrong, please try again later"
            }
        }
    }
}