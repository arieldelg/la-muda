import { Router } from "express";
import { ImagesControllers } from "./controllers";
import { ImageDatasourceImp, ImageRepositoryImp } from "../../infrastructure";

export class ImagesRoutes {
  static get routes() {
    const router = Router();
    const datasource = new ImageDatasourceImp();
    const repository = new ImageRepositoryImp(datasource);
    const imagesControllers = new ImagesControllers(repository);
    router.get("/:image", imagesControllers.getImages);
    return router;
  }
}
