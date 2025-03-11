import { Router } from "express";
import { NotesRoutes } from "./notes/routes";
import { ImagesRoutes } from "./images/routes";
export class AppRoutes {
  static get routes() {
    const router = Router();
    router.use("/api", NotesRoutes.routes);
    router.use("/images", ImagesRoutes.routes);
    return router;
  }
}
