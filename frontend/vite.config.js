import react from "@vitejs/plugin-react";

export default {
  plugins: [react()],
  root: "src",
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3001/",
        changeOrigin: true,
        secure: false,
      },
    },
  },
};
