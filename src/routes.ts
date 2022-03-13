import { Router } from "sunder";
import { Env } from "./bindings";
import { serveStaticAssetsFromKV } from "./middleware/static";

export function registerRoutes(router: Router<Env>) {
  router.get("/", (ctx) => {
    ctx.response.redirect('/index.html');
  });

  router.get("/:assetPath+", serveStaticAssetsFromKV());
  router.head("/:assetPath+", serveStaticAssetsFromKV());
}
