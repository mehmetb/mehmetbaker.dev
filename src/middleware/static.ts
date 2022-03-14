import manifestJSON from '__STATIC_CONTENT_MANIFEST'
import { getAssetFromKV, Options } from '@cloudflare/kv-asset-handler'
import { Context, MiddlewareNextFunction } from 'sunder'
import { Env } from '@/bindings'

const ASSET_MANIFEST = JSON.parse(manifestJSON)

export async function serveAssetFromKV(assetPath: string, context: Context, next: MiddlewareNextFunction) {
  const options: Partial<Options> = { ASSET_MANIFEST };
  options.ASSET_NAMESPACE = context.env.__STATIC_CONTENT;

  const reqInput = `${context.url.origin}/${assetPath}`;

  try {
    const resp = await getAssetFromKV((context as any).event, {
      mapRequestToAsset: (req: Request) => new Request(reqInput, req),
      ...options,
    });
    context.response.overwrite(resp, { mergeHeaders: true });
  } catch (e) {
    const pathname = context.url.pathname;
    context.throw(404, `${pathname} not found`);
  }

  await next();
}

export function serveIndex(ctx: Context<Env>, next: MiddlewareNextFunction) {
  return serveAssetFromKV('index.html', ctx, next);
}

export function serveStaticAssetsFromKV(ctx: Context<Env, { assetPath: string }>, next: MiddlewareNextFunction) {
  return serveAssetFromKV(ctx.params.assetPath, ctx, next);
}
