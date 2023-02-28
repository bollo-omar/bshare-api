import { Secret } from "jsonwebtoken";

export const PORT: number = Number(process.env.PORT as string) | 3000;
export const JWT_SECRET: Secret = process.env.JWT_SECRET as Secret;

export enum STATUS {
    SUCCESS = "SUCCESS",
    FAILURE = "FAILURE"
}
export const BASEURL = "api/v1/"