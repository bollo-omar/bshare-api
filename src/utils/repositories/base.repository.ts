import { PrismaClient } from '@prisma/client';
export interface IBaseRepository<CreateDto, Model> {
    create(payload: CreateDto): Promise<Model>
    findById(id: string): Promise<Model | null>
    findAll(): Promise<Model[]>
    update(id: string, payload: Partial<CreateDto>): Promise<Model>
    delete(id: string): Promise<void>
}