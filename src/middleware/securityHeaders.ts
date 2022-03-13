import { Context } from "sunder";

/**
 * Example middleware that adds a custom header
 */
export async function securityHeaders(ctx: Context, next: Function) {
  ctx.response.headers.set('X-XSS-Protection', '1; mode=block');
  ctx.response.headers.set('X-Content-Type-Options', 'nosniff');
  ctx.response.headers.set('X-Frame-Options', 'DENY');
  ctx.response.headers.set('Referrer-Policy', 'same-origin');
  ctx.response.headers.set('Feature-Policy', 'none');
  await next();
}
