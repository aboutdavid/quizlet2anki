import { defineConfig } from 'vite'
import topLevelAwait from "vite-plugin-top-level-await";
import crx from "rollup-plugin-crx"
import fs from "node:fs";


export default defineConfig({
	plugins: [
		topLevelAwait(),
		crx({
			privateKey: fs.readFileSync('./key.pem'), 
			fileName: "index.crx"
		})
	],
})