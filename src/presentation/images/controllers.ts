import { Request, Response } from "express";
import { GetImages, ImageRepository } from "../../domain";

export class ImagesControllers {
  constructor(private readonly imageRepository: ImageRepository) {}
  public getImages = async (req: Request, res: Response) => {
    const { image } = req.params;
    new GetImages(this.imageRepository)
      .execute(image)
      .then((resp) => res.status(200).send(resp))
      .catch((err) => res.status(500).send(err));
  };
}
