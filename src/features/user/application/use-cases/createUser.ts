import { UserRepository } from "../../infrustructure/data/userRepository";
import { CreateUserDto } from '../../domain/models/IUser';
import { IRessponse } from '../../../../utils/models/response';
import { STATUS } from "@/utils/constants";
import logger from "@/features/logging/logger";
import { generateToken } from '../../infrustructure/utils/token-generator';


export class CreateUserService {
    private readonly userRepository;
    private readonly payload: CreateUserDto;

    constructor(payload: CreateUserDto) {
        this.userRepository = new UserRepository()
        this.payload = payload;
    }

    async execute(): Promise<IRessponse> {
        try {
            const user = await this.userRepository.create(this.payload);
            delete user.passwordHash
            return {
                STATUS: STATUS.SUCCESS,
                MESSAGE: "user created successfully",
                DATA: {
                    user,
                    token: await generateToken({ id: user.id })
                }
            }

        } catch (error: any) {
            logger.warn(error.message)
            return {
                STATUS: STATUS.FAILURE,
                MESSAGE: error.code === "P2002" ? `Email '${this.payload.email}' is already in use` : "Oops! something went wrong, try again later"
            }
        }
    }
}