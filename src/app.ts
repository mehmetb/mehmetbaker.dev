import { Router, Sunder } from "sunder";
import { renderErrorsAsJSON } from "sunder/middleware/render";
import { registerRoutes } from "./routes";
import { renderErrorsAsHTML } from "./middleware/htmlErrors";
import { securityHeaders } from './middleware/securityHeaders';
import { Env } from "./bindings";

export function createApp() {
    const app = new Sunder<Env>();
    const router = new Router<Env>();

    app.use(securityHeaders);
    registerRoutes(router);

    app.use(renderErrorsAsHTML);
    app.use(renderErrorsAsJSON);

    app.use(router.middleware);

    return app;
}
