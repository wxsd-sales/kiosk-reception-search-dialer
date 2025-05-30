import { sveltekit } from '@sveltejs/kit/vite';

/** @type {import('vite').UserConfig} */
const config = {
  plugins: [sveltekit()],
  preview: {
    allowedHosts: ['3aee-2a0c-5a87-3400-5d00-1c1d-52e8-bcad-edff.ngrok-free.app'],
    /**
    host: true,
    port: 4173,
    strictPort: true,
    cors: true 
    **/
  }

};

export default config;
