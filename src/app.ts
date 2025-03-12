import { AppRoutes } from "./presentation/routes";
import { Server } from "./presentation/server";
import "dotenv/config";
(() => {
  app();
})();

function app() {
  const server = new Server({
    port: +process.env.PORT!,
    router: AppRoutes.routes,
  });

  server.start();
}
