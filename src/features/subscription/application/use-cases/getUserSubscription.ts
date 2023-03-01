import { SubscriptionRepository } from '../../infrastructure/data/subscriptions.repository';
import { ISubscriptionRepository } from '../../infrastructure/data/ISubscription.repository';
import { IRessponse } from '@/utils/models/response';
import { STATUS } from '@/utils/constants';

export class GetUserSubscriptionService {
    private readonly subscriptionRepository: ISubscriptionRepository;
    private readonly userId: string;

    constructor(userId: string) {
        this.userId = userId;
        this.subscriptionRepository = new SubscriptionRepository();
    }

    async execute(): Promise<IRessponse> {
        try {
            const subcription = await this.subscriptionRepository.findUserSubscription(this.userId);
            if (!subcription) {
                return {
                    STATUS: STATUS.FAILURE,
                    MESSAGE: "you dont have an active subscription"
                }
            }
            return {
                STATUS: STATUS.SUCCESS,
                MESSAGE: "success",
                DATA: subcription
            }
        } catch (error: any) {
            return {
                STATUS: STATUS.FAILURE,
                MESSAGE: "oops! something went wrong"
            }
        }
    }
}