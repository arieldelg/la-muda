import { Router } from "express";
import { ImagesControllers } from "./controllers";
import { ImageDatasourceImp, ImageRepositoryImp } from "../../infrastructure";
import { upload } from "../../config/multer";

export class ImagesRoutes {
  static get routes() {
    const router = Router();
    const datasource = new ImageDatasourceImp();
    const repository = new ImageRepositoryImp(datasource);
    const imagesControllers = new ImagesControllers(repository);

    router.get("/:image", imagesControllers.getImages);
    router.post("/", upload.array("files"), imagesControllers.uploadImages);
    return router;
  }
}
