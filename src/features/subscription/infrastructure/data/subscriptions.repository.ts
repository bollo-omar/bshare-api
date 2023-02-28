import { db } from '@/utils/database/db';
import { ISubscription, CreateSubscriptionDto } from '../../domain/models/ISubscription';
import { ISubscriptionRepository, IValidSubscription } from './ISubscription.repository';
import { SubscriptionType } from '@prisma/client';

export class SubscriptionRepository implements ISubscriptionRepository {

    async checkActiveSubscription(userId: string): Promise<IValidSubscription | null> {
        return db.subscription.findFirst({
            where: {
                userId,
                AND: {
                    isActive: true
                }
            },
            select: {
                isActive: true
            }
        })
    }

    async findByType(type: SubscriptionType): Promise<ISubscription | null> {
        return db.subscription.findFirst({
            where: {
                subscriptionType: type
            }
        })
    }
    async create(payload: CreateSubscriptionDto): Promise<ISubscription> {
        return db.subscription.create({
            data: payload
        })
    }

    async findById(id: string): Promise<ISubscription | null> {
        return db.subscription.findUnique({
            where: { id }
        })
    }

    async findAll(): Promise<ISubscription[]> {
        return db.subscription.findMany()
    }

    update(id: string, payload: Partial<CreateSubscriptionDto>): Promise<ISubscription> {
        return db.subscription.update({
            data: payload,
            where: { id }
        })
    }

    async delete(id: string): Promise<void> {
        await db.subscription.delete({
            where: { id }
        })
    }

}