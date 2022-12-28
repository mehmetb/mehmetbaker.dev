import { getAssetFromKV } from '@cloudflare/kv-asset-handler';

/**
 * The DEBUG flag will do two things that help during development:
 * 1. we will skip caching on the edge, which makes it easier to
 *    debug.
 * 2. we will return an error message on exception in your Response rather
 *    than the default 404.html page.
 */
const DEBUG = false;

addEventListener('fetch', event => {
	event.respondWith(handleEvent(event));
});

/**
 * @param {Response} response 
 */
function setHeaders(response) {
	response.headers.set('X-XSS-Protection', '1; mode=block');
	response.headers.set('X-Content-Type-Options', 'nosniff');
	response.headers.set('X-Frame-Options', 'DENY');
	response.headers.set('Referrer-Policy', 'no-referrer');
	response.headers.set('Feature-Policy', 'none');
  response.headers.set('Content-Security-Policy', `default-src 'none'; script-src 'sha256-JewZyhwxAu5Fi8BC7A6qSmoWax0XZuleR7vx2bs5/CY='; style-src 'sha256-IdiNiYBJ0eaFf3ZhEkaYRc5PcEm/kqj4NnHOt/3EoaI='; img-src 'self';form-action 'none'; base-uri 'none'; frame-ancestors 'none';`);
}

/**
 * @param {FetchEvent} event
 * @returns {Promise<Response>}
 */
async function handleEvent(event) {
	const options = {};

	try {
		if (DEBUG) {
			// customize caching
			options.cacheControl = {
				bypassCache: true,
			};
		}

		const page = await getAssetFromKV(event, options);

		// allow headers to be altered
		const response = new Response(page.body, page);
    setHeaders(response);

		return response;
	} catch (e) {
		// if an error is thrown serve the asset at index.html
		if (!DEBUG) {
			try {
				// temporary redirect
				return Response.redirect(`${new URL(event.request.url).origin}/index.html`, 307);
				/*
				const notFoundResponse = await getAssetFromKV(event, {
					mapRequestToAsset: req => new Request(`${new URL(req.url).origin}/index.html`, req),
				});

        const response = new Response(notFoundResponse.body, {
					...notFoundResponse,
					status: 404,
				});

        setHeaders(response);
        return response;
				*/
			} catch (_) {
        // no-op
      }
		}

		return new Response(e.message || e.toString(), { status: 500 });
	}
}
