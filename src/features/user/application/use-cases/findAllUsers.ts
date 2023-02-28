import { IRessponse } from "@/utils/models/response";
import { IUserRepository } from "../../infrustructure/data/IUserRepository";
import { UserRepository } from "../../infrustructure/data/userRepository";
import { STATUS } from '@/utils/constants';

export class FindAllUsersService {
    private readonly _userRpository: IUserRepository;
    constructor() {
        this._userRpository = new UserRepository()
    }

    async execute(): Promise<IRessponse> {
        try {
            const users = await this._userRpository.findAll()

            users.forEach(user => {
                delete user.Contacts
                delete user.passwordHash
            })

            return {
                STATUS: STATUS.SUCCESS,
                MESSAGE: `${users.length} user(s) found`,
                DATA: users
            }
        } catch (error: any) {
            return {
                STATUS: STATUS.FAILURE,
                MESSAGE: "oops! something went wrong, try again later",
            }
        }
    }
}