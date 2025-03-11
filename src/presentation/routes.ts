import { Router } from "express";
import { ReviewRoutes } from "./reviews/routes";
import { ImagesRoutes } from "./images/routes";
export class AppRoutes {
  static get routes() {
    const router = Router();
    router.use("/review", ReviewRoutes.routes);
    router.use("/image", ImagesRoutes.routes);
    return router;
  }
}
