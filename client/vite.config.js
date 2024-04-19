import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// Adding a proxy to the Vite configuration file will allow us to make requests to the server from the client.(as server is running on port 3000 and client on 5173, so we need to proxy the requests from client to server to avoid CORS error)
export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        secure: false,
      },
    },
  },

  plugins: [react()],
});
