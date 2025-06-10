import { sveltekit } from '@sveltejs/kit/vite';

/** @type {import('vite').UserConfig} */
const config = {
  plugins: [sveltekit()],
  preview: {
    allowedHosts: ['2a2e-79-112-26-199.ngrok-free.app'],
    /**
    host: true,
    port: 4173,
    strictPort: true,
    cors: true 
    **/
  }

};

export default config;
