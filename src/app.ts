import { AppRoutes } from "./presentation/routes";
import { Server } from "./presentation/server";

(() => {
  app();
})();

function app() {
  const server = new Server({
    port: 3000,
    router: AppRoutes.routes,
  });

  server.start();
}
