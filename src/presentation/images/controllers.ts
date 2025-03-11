import { Request, Response } from "express";
import { cloudinary } from "../../config/cloudinary";

export class ImagesControllers {
  public getImages = (_req: Request, res: Response) => {
    try {
      cloudinary.api
        .resources_by_asset_folder("la-muda")
        .then((res) => console.log(res));

      res.status(200).send({ message: "papui" });
    } catch (error) {
      res.status(500).send({ error });
    }
  };
}
