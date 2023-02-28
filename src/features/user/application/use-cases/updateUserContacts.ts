import { IUserRepository } from "../../infrustructure/data/IUserRepository";
import { UserRepository } from "../../infrustructure/data/userRepository";
import { CreateUserDto } from '../../domain/models/IUser';
import { IRessponse } from "@/utils/models/response";
import { STATUS } from '@/utils/constants';
import logger from '../../../logging/logger';

export class UpdateUserContactsService {
    private readonly userRepository: IUserRepository;
    private readonly payload: Partial<CreateUserDto>
    private readonly id: string;

    constructor(id: string, payload: Partial<CreateUserDto>) {
        this.userRepository = new UserRepository();
        this.payload = payload
        this.id = id;
    }

    async execute(): Promise<IRessponse> {
        try {

            const user = await this.userRepository.update(this.id, this.payload)
            delete user.passwordHash;

            return {
                STATUS: STATUS.SUCCESS,
                MESSAGE: "address updated successfully",
                DATA: user
            }
        } catch (error: any) {
            logger.error(error.message);
            return {
                STATUS: STATUS.FAILURE,
                MESSAGE: error.code === "P2025" ? "sorry cant update an innexistent user" : "oops! something went wrong, try again later"
            }
        }
    }
}