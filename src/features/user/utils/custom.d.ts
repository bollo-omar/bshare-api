import { IUser } from "../domain/models/IUser";
declare global {
    namespace Express {
        export interface Request {
            user: IUser;
        }
    }
}