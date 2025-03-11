import { Router } from "express";
import { ImagesControllers } from "./controllers";

export class ImagesRoutes {
  static get routes() {
    const router = Router();
    const imagesControllers = new ImagesControllers();
    router.get("/", imagesControllers.getImages);
    return router;
  }
}
