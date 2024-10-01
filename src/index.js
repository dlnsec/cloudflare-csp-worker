/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

export default {
	async fetch(request, env, ctx) {
		const DEFAULT_SECURITY_HEADERS = {
		/*
		Secure your application with Content-Security-Policy headers.
		Enabling these headers will permit content from a trusted domain and all its subdomains.
		@see https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy
		"Content-Security-Policy": "default-src 'self' example.com *.example.com",
		*/
		"Content-Security-Policy": "default-src self; frame-ancestors none;",
		/*
		You can also set Strict-Transport-Security headers.
		These are not automatically set because your website might get added to Chrome's HSTS preload list.
		Here's the code if you want to apply it:
		"Strict-Transport-Security" : "max-age=63072000; includeSubDomains; preload",
		*/
		/*
		Permissions-Policy header provides the ability to allow or deny the use of browser features, such as opting out of FLoC - which you can use below:
		"Permissions-Policy": "interest-cohort=()",
		*/
		/*
		X-XSS-Protection header prevents a page from loading if an XSS attack is detected.
		@see https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-XSS-Protection
		*/
		"X-XSS-Protection": "0",
		/*
		X-Frame-Options header prevents click-jacking attacks.
		@see https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options
		*/
		"X-Frame-Options": "DENY",
		/*
		X-Content-Type-Options header prevents MIME-sniffing.
		@see https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Content-Type-Options
		*/
		"X-Content-Type-Options": "nosniff",
		"Referrer-Policy": "strict-origin-when-cross-origin",
		"Cross-Origin-Embedder-Policy": 'require-corp; report-to="default";',
		"Cross-Origin-Opener-Policy": 'same-site; report-to="default";',
		"Cross-Origin-Resource-Policy": "same-site",
		};

		let response = await fetch(request);
		let newHeaders = new Headers(request.headers);

		// This sets the headers for HTML responses:
		if (
			newHeaders.has("Content-Type") &&
			!newHeaders.get("Content-Type").includes("text/html")
		  ) {
			return new Response(response.body, {
			  status: response.status,
			  statusText: response.statusText,
			  headers: newHeaders,
			});
		  }

		  Object.keys(DEFAULT_SECURITY_HEADERS).map((name) => {
			newHeaders.set(name, DEFAULT_SECURITY_HEADERS[name]);
		  });

		   response.text = "Hello, worker!";
	  
		  return new Response(response.text, {
			status: "200",
			statusText: "OK",
			headers: newHeaders,
		  });
	},
};
