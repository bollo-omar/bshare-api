import { IRessponse } from '@/utils/models/response';
import { UserRepository } from '../../infrustructure/data/userRepository';
import { IUserRepository } from './../../infrustructure/data/IUserRepository';
import { compare, hash } from 'bcryptjs';
import { STATUS } from '@/utils/constants';
import { generateToken } from '../../infrustructure/utils/token-generator';

export class LoginService {
    private readonly email: string;
    private readonly password: string;
    private readonly userRepository: IUserRepository;

    constructor(email: string, password: string) {
        this.email = email;
        this.password = password;
        this.userRepository = new UserRepository();
    }
    async execute(): Promise<IRessponse> {
        try {
            const user = await this.userRepository.findUserByEmail(this.email);

            if (!user) {
                return {
                    STATUS: STATUS.FAILURE,
                    MESSAGE: "user not found",
                }
            }
            if (await compare(await hash(this.password, 10), user.passwordHash as string)) {
                return {
                    STATUS: STATUS.FAILURE,
                    MESSAGE: "wrong login credentials"
                }
            }
            delete user.passwordHash;
            return {
                STATUS: STATUS.SUCCESS,
                MESSAGE: "login successful",
                DATA: {
                    user,
                    token: await generateToken({ id: user.id })
                }
            }

        } catch (error: any) {
            return {
                STATUS: STATUS.FAILURE,
                MESSAGE: "oops! Something went wrong, try again later"
            }
        }
    }
}