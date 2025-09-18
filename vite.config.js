import { sveltekit } from '@sveltejs/kit/vite';

/** @type {import('vite').UserConfig} */
const config = {
  plugins: [sveltekit()],
  preview: {
    allowedHosts: ['https://acd537a36fc2.ngrok-free.app/'],
    /**
    host: true,
    port: 4173,
    strictPort: true,
    cors: true 
    **/
  }

};

export default config;
