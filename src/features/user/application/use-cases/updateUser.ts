import { IRessponse } from "@/utils/models/response";
import { CreateUserDto } from "../../domain/models/IUser";
import { IUserRepository } from "../../infrustructure/data/IUserRepository";
import { UserRepository } from "../../infrustructure/data/userRepository";
import { STATUS } from '../../../../utils/constants';

export class UpdateUserService {
    readonly id: string;
    readonly payload: Partial<CreateUserDto>
    readonly userRepository: IUserRepository

    constructor(id: string, payload: Partial<CreateUserDto>) {
        this.id = id;
        this.payload = payload;
        this.userRepository = new UserRepository()
    }

    async execute(): Promise<IRessponse> {
        try {
            const user = await this.userRepository.update(this.id, this.payload);
            return {
                STATUS: STATUS.SUCCESS,
                MESSAGE: "user updated successfully",
                DATA: user
            }
        } catch (error: any) {
            return {
                STATUS: STATUS.FAILURE,
                MESSAGE: "oops!, something went wrong, please try again"
            }
        }
    }
}