import { IRessponse } from "@/utils/models/response";
import { IUserRepository } from "../../infrustructure/data/IUserRepository";
import { UserRepository } from "../../infrustructure/data/userRepository";
import { STATUS } from '../../../../utils/constants';

export class FindUserByIdService {
    readonly id: string;
    readonly userRepository: IUserRepository

    constructor(id: string) {
        this.id = id;
        this.userRepository = new UserRepository();
    }

    async execute(): Promise<IRessponse> {
        try {
            const user = await this.userRepository.findById(this.id)
            if (!user) {
                return {
                    STATUS: STATUS.FAILURE,
                    MESSAGE: "user not found",
                }
            }
            delete user.passwordHash;
            return {
                STATUS: STATUS.SUCCESS,
                MESSAGE: "success",
                DATA: user
            }
        } catch (error: any) {
            return {
                STATUS: STATUS.FAILURE,
                MESSAGE: "oops! Something went wrong, please try again"
            }
        }
    }
}