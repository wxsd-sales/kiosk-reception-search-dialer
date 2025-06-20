import { sveltekit } from '@sveltejs/kit/vite';

/** @type {import('vite').UserConfig} */
const config = {
  plugins: [sveltekit()],
  preview: {
    allowedHosts: ['eabd-2a0c-5a87-3400-5d00-980e-263d-8dbb-a53f.ngrok-free.app'],
    /**
    host: true,
    port: 4173,
    strictPort: true,
    cors: true 
    **/
  }

};

export default config;
