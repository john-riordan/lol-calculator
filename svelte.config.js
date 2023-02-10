import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),
		alias: {
			$components: 'src/components',
			$utils: 'src/utils',
			$constants: 'src/constants'
		}
	},
	preprocess: [vitePreprocess()]
};

export default config;
