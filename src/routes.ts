import { Context, MiddlewareNextFunction, Router } from "sunder";
import { Env } from "./bindings";
import { homeHandler } from "./handlers/home";
import { serveStaticAssetsFromKV } from "./middleware/static";

export function registerRoutes(router: Router<Env>) {
    router.get("/", (ctx) => {
      ctx.response.redirect('/index.html');
    });

    router.get("/:assetPath+", serveStaticAssetsFromKV());
    router.head("/:assetPath+", serveStaticAssetsFromKV());
}
