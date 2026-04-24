import { defineConfig } from "vite"
import desktopPlugin from "./vite"

export default defineConfig({
  plugins: [desktopPlugin] as any,
  server: {
    host: "0.0.0.0",
    allowedHosts: true,
    port: 3000,
    proxy: {
      "/auth": {
        target: "http://localhost:4096",
      },
      "/global": {
        target: "http://localhost:4096",
        ws: true,
      },
      "/session": {
        target: "http://localhost:4096",
      },
      "/config": {
        target: "http://localhost:4096",
      },
      "/provider": {
        target: "http://localhost:4096",
      },
      "/pty": {
        target: "http://localhost:4096",
        ws: true,
      },
      "/command": {
        target: "http://localhost:4096",
      },
      "/agent": {
        target: "http://localhost:4096",
      },
      "/skill": {
        target: "http://localhost:4096",
      },
      "/permission": {
        target: "http://localhost:4096",
      },
      "/question": {
        target: "http://localhost:4096",
      },
      "/mcp": {
        target: "http://localhost:4096",
      },
      "/sync": {
        target: "http://localhost:4096",
      },
      "/event": {
        target: "http://localhost:4096",
      },
      "/vcs": {
        target: "http://localhost:4096",
      },
      "/path": {
        target: "http://localhost:4096",
      },
      "/log": {
        target: "http://localhost:4096",
      },
    },
  },
  build: {
    target: "esnext",
    // sourcemap: true,
  },
})
