//import adapter from '@sveltejs/adapter-auto';

//import adapter from 'svelte-adapter-deno';
import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/kit/vite';

const dev = process.argv.includes('dev');

const staticPaths = [
	'/',
	'/reentry',
	'/open',
	'/release',
	'/refocus',
	'/about',
	'/terms-of-use',
	'/nudge-bug-terms',
	'/full_tos',
	'/tos'
];

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),
	kit: {
		files: {
			assets: "static",
			lib: "src/lib"
		},
		alias: {
			// // this will match a file
			// 'my-file': 'path/to/my-file.js',

			// // this will match a directory and its contents
			// // (`my-directory/x` resolves to `path/to/my-directory/x`)
			// 'my-directory': 'path/to/my-directory',

			// // an alias ending /* will only match
			// // the contents of a directory, not the directory itself
			// 'my-directory/*': 'path/to/my-directory/*'
		},
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: adapter({
			// default options are shown. On some platforms
			// these options are set automatically — see below
			pages: 'build',
			assets: 'build',
			fallback: null,

		}),
		inlineStyleThreshold: Infinity,
		paths: {
			base: dev ? '' : process.env.BASE_PATH || ''
		},
		prerender: {
			crawl: false,
			entries: staticPaths,
			handleHttpError: 'warn'
			// handleHttpError: ({ path, referrer, message }) => {
			//     // ignore deliberate link to shiny 404 page
			//     if (path === '/not-found' && referrer === '/blog/how-we-built-our-404-page') {
			//         return;
			//     }

			//     // otherwise fail the build
			//     throw new Error(message);
			// }
		}
	}
};

export default config;
