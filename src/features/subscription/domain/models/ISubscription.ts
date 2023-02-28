import { IBaseModel } from '@/utils/models/base.model';
import { SubscriptionType } from '@prisma/client';

export interface CreateSubscriptionDto {
    userId: string;
    subscriptionType: SubscriptionType;
    endDate: Date;
    startDate: Date;
    isActive: boolean;
}

export interface ISubscription extends IBaseModel {
    userId: string;
    subscriptionType: SubscriptionType;
    startDate?: Date | null;
    endDate?: Date | null;
    isActive: boolean;
}