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

const STYLE_SRC: string = [
  `'self'`,
  'https://fonts.googleapis.com',
  `'sha256-yDqp/rMnw04H0wAWjumgZzAS4BJJNC2Lc8N20OhOsbY='`,
  `'sha256-ebohbhmnr+AzVPDPCDGN2CQPjH1HbDwUtvOm5Hy4fYo='`,
  `'sha256-ixVUGs3ai0rMA0pgIVBN0KVlYbQip7/5SGmnUwJPNqE='`,
  `'unsafe-hashes'`,
].join(' ');

const CONTENT_SECURITY_POLICY: string = [
  `default-src 'self'`,
  `style-src  ${STYLE_SRC}`,
  `script-src 'self' https://cdn.jsdelivr.net https://cdnjs.cloudflare.com 'sha256-pOKOA/vvx/hjAEyauQzmoP9XM2HbuP0scaE5y/jWjtI='`,
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
  ctx.response.headers.set('Cache-Control', 'no-cache');
  ctx.response.headers.set('Feature-Policy', FEATURE_POLICY);
  ctx.response.headers.set('Permissions-Policy', PERMISSIONS_POLICY);
  ctx.response.headers.set('Content-Security-Policy', CONTENT_SECURITY_POLICY);
  await next();
}
