import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: 'src/index.js',
      name: 'adx402',
      formats: ['es', 'umd'],
      fileName: (format) => `adx402.${format}.js`,
    },
    rollupOptions: {
      external: [],
      output: {
        globals: {},
      },
    },
    target: 'es2015',
    minify: true,
  },
});