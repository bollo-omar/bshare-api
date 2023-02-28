import { Router } from "express";

export interface IBaseRoute {
    readonly route: Router;
    readonly path: string;
}