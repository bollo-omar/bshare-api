import express, { Application } from "express";
import helmet from "helmet";
import compression from "compression";
import cors from "cors";
import { IBaseRouter } from "@/utils/models/base.route";
import { BASEURL } from "@/utils/constants";
import morganMiddleware from "@/features/middleware/morgan.middleware";
import { globalErrorHandler, notFoundErrorHandler } from "@/features/middleware/error.middleware";
import logger from "./features/logging/logger";

export default class Server {
    readonly App: Application;
    private readonly _port: number;

    constructor(port: number, routes: IBaseRouter[]) {
        this.App = express();
        this._port = port;

        this.initMiddlewares()
        this.initRoutes(routes)
        this.initErrorHandler();
    }

    private initRoutes(routes: IBaseRouter[]) {
        routes.forEach(route => {
            this.App.use(`/${BASEURL}`, route.router);
        })
    }

    private initMiddlewares() {
        this.App.use(helmet())
        this.App.use(cors());
        this.App.use(morganMiddleware)
        this.App.use(express.json());
        this.App.use(express.urlencoded({ extended: false }));
        this.App.use(compression())
    }

    private initErrorHandler() {
        this.App.use(notFoundErrorHandler);
        this.App.use(globalErrorHandler);
    }


    listen() {
        try {
            this.App.listen(this._port, '0.0.0.0', () => {
                logger.info("server started and listening on port : " + this._port);
            })
        } catch (error: any) {
            logger.error(error.message);
        }
    }
}