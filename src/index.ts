import "dotenv/config";
import 'module-alias/register'
import Server from "./server";
import { PORT } from "./utils/constants";
import { UserRouter } from "./features/user/application/userRoute";
import { SubscriptionRouter } from './features/subscription/application/subscriptionRoutes';

const server = new Server(
    PORT,
    [
        new UserRouter(),
        new SubscriptionRouter()

    ]
);

server.listen()