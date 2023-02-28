import { IBaseRouter } from "@/utils/models/base.route";
import { Router } from 'express';
import { SIGNUP, UPDATEUSERADDRESS, LOGIN, FINDUSERBYID, LISTALLUSERS, PROFILE } from './routes';
import { login, registerUser, updateUserContacts, getUserById, updateUser, listAllUsers, profile } from './user.controller';
import { authenticated } from "@/features/middleware/auth.middleware";

export class UserRouter implements IBaseRouter {
    readonly router: Router = Router();

    constructor() {
        this.router.route(SIGNUP).post(registerUser);
        this.router.route(LOGIN).post(login);
        this.router.route(PROFILE).get(authenticated, profile)
        this.router.route(LISTALLUSERS).get(authenticated, listAllUsers);
        this.router.route(UPDATEUSERADDRESS).patch(authenticated, updateUserContacts);
        this.router.route(FINDUSERBYID)
            .get(authenticated, getUserById)
            .patch(authenticated, updateUser)
    }

} 