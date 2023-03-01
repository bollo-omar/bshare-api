import { SubscriptionType } from '@prisma/client';
import { ISubscription, CreateSubscriptionDto } from '../../domain/models/ISubscription';
import { IBaseRepository } from '@/utils/repositories/base.repository';

export interface IValidSubscription {
    isActive: boolean
}
export interface ISubscriptionRepository extends IBaseRepository<CreateSubscriptionDto, ISubscription> {
    checkActiveSubscription(userId: string): Promise<IValidSubscription | null>
    findByType(type: SubscriptionType): Promise<ISubscription | null>;
    findUserSubscription(userId: string): Promise<ISubscription | null>
}