import react from "@vitejs/plugin-react";

export default {
  plugins: [react()],
  root: "src",
  publicDir: "../public",
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:4000/",
        changeOrigin: true,
        secure: false,
      },
    },
  },
};
