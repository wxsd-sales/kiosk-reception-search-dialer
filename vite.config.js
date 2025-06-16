import { sveltekit } from '@sveltejs/kit/vite';

/** @type {import('vite').UserConfig} */
const config = {
  plugins: [sveltekit()],
  preview: {
    allowedHosts: ['b58b-2a0c-5a87-3400-5d00-c1b9-c89-8256-89f.ngrok-free.app'],
    /**
    host: true,
    port: 4173,
    strictPort: true,
    cors: true 
    **/
  }

};

export default config;
