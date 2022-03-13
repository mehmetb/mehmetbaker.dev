import { Context } from 'sunder';

const FEATURES: string[] = [
  'accelerometer',
  'ambient-light-sensor',
  'autoplay',
  'battery',
  'camera',
  'display-capture',
  'document-domain',
  'encrypted-media',
  'execution-while-not-rendered',
  'execution-while-out-of-viewport',
  'fullscreen',
  'gamepad',
  'geolocation',
  'gyroscope',
  'layout-animations',
  'legacy-image-formats',
  'magnetometer',
  'microphone',
  'midi',
  'navigation-override',
  'oversized-images',
  'payment',
  'picture-in-picture',
  'publickey-credentials-get',
  'speaker-selection',
  'sync-xhr',
  'unoptimized-images ',
  'unsized-media ',
  'usb',
  'screen-wake-lock',
  'web-share',
  'xr-spatial-tracking'
];

const FEATURE_POLICY: string = FEATURES
  .map(feature => `${feature} 'none'`)
  .join('; ');

const PERMISSIONS_POLICY: string = FEATURES
  .map(feature => `${feature}=()`)
  .join(', ');

const CONTENT_SECURITY_POLICY: string = [
  `default-src 'self'`,
  `style-src  'self' https://fonts.googleapis.com 'unsafe-inline'`,
  `script-src 'self' https://cdn.jsdelivr.net`,
  `font-src 'self' https://fonts.gstatic.com`,
  `img-src 'self' data:`,
  `frame-ancestors 'none'`,
  `object-src 'none'`,
  `base-uri 'self'`,
  `form-action 'self'`,
].join('; ');

/**
 * Example middleware that adds a custom header
 */
export async function securityHeaders(ctx: Context, next: Function) {
  ctx.response.headers.set('X-XSS-Protection', '1; mode=block');
  ctx.response.headers.set('X-Content-Type-Options', 'nosniff');
  ctx.response.headers.set('X-Frame-Options', 'DENY');
  ctx.response.headers.set('Referrer-Policy', 'same-origin');
  ctx.response.headers.set('Feature-Policy', FEATURE_POLICY);
  ctx.response.headers.set('Permissions-Policy', PERMISSIONS_POLICY);
  ctx.response.headers.set('Content-Security-Policy', CONTENT_SECURITY_POLICY);
  await next();
}
