import { Router } from "express";
import { NotesRoutes } from "./notes/routes";
export class AppRoutes {
  static get routes() {
    const router = Router();
    router.use("/api", NotesRoutes.routes);
    return router;
  }
}
