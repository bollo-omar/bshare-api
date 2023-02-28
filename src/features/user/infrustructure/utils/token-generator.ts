import { JWT_SECRET } from "@/utils/constants";
import jwt from "jsonwebtoken";

export interface IToken {
    id: string;
    expiresIn: number
}
export const generateToken = async (payload: {}): Promise<string> => {
    return jwt.sign(
        payload,
        JWT_SECRET,
        {
            expiresIn: '8760H'
        }
    )
}
export const verifyToken = (token: string): Promise<jwt.VerifyErrors | IToken> => {

    return new Promise((resolve, reject) => {
        jwt.verify(token, JWT_SECRET, (err, payload) => {
            if (err) return reject(err);

            resolve(payload as IToken)
        })
    })
}