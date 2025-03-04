// vite.config.ts
import devServer from "file:///Users/armaandhanji/Downloads/hono-vite-jsx/node_modules/@hono/vite-dev-server/dist/index.js";
import { defineConfig } from "file:///Users/armaandhanji/Downloads/hono-vite-jsx/node_modules/vite/dist/node/index.js";
import tailwindcss from "file:///Users/armaandhanji/Downloads/hono-vite-jsx/node_modules/@tailwindcss/vite/dist/index.mjs";
import build from "file:///Users/armaandhanji/Downloads/hono-vite-jsx/node_modules/@hono/vite-build/dist/adapter/node/index.js";
var vite_config_default = defineConfig(({ mode }) => {
  if (mode === "client")
    return {
      plugins: [tailwindcss()],
      esbuild: {
        jsxImportSource: "hono/jsx/dom"
        // Optimized for hono/jsx/dom
      },
      build: {
        rollupOptions: {
          input: "./src/client.tsx",
          output: {
            entryFileNames: "static/client.js"
          }
        }
      }
    };
  return {
    plugins: [
      tailwindcss(),
      build({
        entry: "src/index.tsx"
      }),
      devServer({
        entry: "src/index.tsx"
      })
    ]
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvYXJtYWFuZGhhbmppL0Rvd25sb2Fkcy9ob25vLXZpdGUtanN4XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvYXJtYWFuZGhhbmppL0Rvd25sb2Fkcy9ob25vLXZpdGUtanN4L3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy9hcm1hYW5kaGFuamkvRG93bmxvYWRzL2hvbm8tdml0ZS1qc3gvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgZGV2U2VydmVyIGZyb20gXCJAaG9uby92aXRlLWRldi1zZXJ2ZXJcIjtcbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gXCJ2aXRlXCI7XG5pbXBvcnQgdGFpbHdpbmRjc3MgZnJvbSBcIkB0YWlsd2luZGNzcy92aXRlXCI7XG5cbi8vIENoYW5nZSB0aGUgaW1wb3J0IHRvIHVzZSB5b3VyIHJ1bnRpbWUgc3BlY2lmaWMgYnVpbGRcbmltcG9ydCBidWlsZCBmcm9tIFwiQGhvbm8vdml0ZS1idWlsZC9ub2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZygoeyBtb2RlIH0pID0+IHtcbiAgaWYgKG1vZGUgPT09IFwiY2xpZW50XCIpXG4gICAgcmV0dXJuIHtcbiAgICAgIHBsdWdpbnM6IFt0YWlsd2luZGNzcygpXSxcbiAgICAgIGVzYnVpbGQ6IHtcbiAgICAgICAganN4SW1wb3J0U291cmNlOiBcImhvbm8vanN4L2RvbVwiLCAvLyBPcHRpbWl6ZWQgZm9yIGhvbm8vanN4L2RvbVxuICAgICAgfSxcbiAgICAgIGJ1aWxkOiB7XG4gICAgICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgICAgICBpbnB1dDogXCIuL3NyYy9jbGllbnQudHN4XCIsXG4gICAgICAgICAgb3V0cHV0OiB7XG4gICAgICAgICAgICBlbnRyeUZpbGVOYW1lczogXCJzdGF0aWMvY2xpZW50LmpzXCIsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfTtcblxuICByZXR1cm4ge1xuICAgIHBsdWdpbnM6IFtcbiAgICAgIHRhaWx3aW5kY3NzKCksXG4gICAgICBidWlsZCh7XG4gICAgICAgIGVudHJ5OiBcInNyYy9pbmRleC50c3hcIixcbiAgICAgIH0pLFxuICAgICAgZGV2U2VydmVyKHtcbiAgICAgICAgZW50cnk6IFwic3JjL2luZGV4LnRzeFwiLFxuICAgICAgfSksXG4gICAgXSxcbiAgfTtcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFtVCxPQUFPLGVBQWU7QUFDelUsU0FBUyxvQkFBb0I7QUFDN0IsT0FBTyxpQkFBaUI7QUFHeEIsT0FBTyxXQUFXO0FBRWxCLElBQU8sc0JBQVEsYUFBYSxDQUFDLEVBQUUsS0FBSyxNQUFNO0FBQ3hDLE1BQUksU0FBUztBQUNYLFdBQU87QUFBQSxNQUNMLFNBQVMsQ0FBQyxZQUFZLENBQUM7QUFBQSxNQUN2QixTQUFTO0FBQUEsUUFDUCxpQkFBaUI7QUFBQTtBQUFBLE1BQ25CO0FBQUEsTUFDQSxPQUFPO0FBQUEsUUFDTCxlQUFlO0FBQUEsVUFDYixPQUFPO0FBQUEsVUFDUCxRQUFRO0FBQUEsWUFDTixnQkFBZ0I7QUFBQSxVQUNsQjtBQUFBLFFBQ0Y7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUVGLFNBQU87QUFBQSxJQUNMLFNBQVM7QUFBQSxNQUNQLFlBQVk7QUFBQSxNQUNaLE1BQU07QUFBQSxRQUNKLE9BQU87QUFBQSxNQUNULENBQUM7QUFBQSxNQUNELFVBQVU7QUFBQSxRQUNSLE9BQU87QUFBQSxNQUNULENBQUM7QUFBQSxJQUNIO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
