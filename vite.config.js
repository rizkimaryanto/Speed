import { defineConfig } from "vite";

export default defineConfig(({ command }) => {
  if (command === "serve") {
    return {
      base: "/", //dev base url
    };
  }
  if (command === "build") {
    return {
      base: "/tap-on-time/", //repo name for deploy
    };
  }
});
