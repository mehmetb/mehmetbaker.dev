import { Router } from "sunder";
import { Env } from "./bindings";
import { serveStaticAssetsFromKV, serveIndex } from "./middleware/static";

export function registerRoutes(router: Router<Env>) {
  router.get("/", serveIndex);
  router.get("/:assetPath+", serveStaticAssetsFromKV);
  router.head("/:assetPath+", serveStaticAssetsFromKV);
}
