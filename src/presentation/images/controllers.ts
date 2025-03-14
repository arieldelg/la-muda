import { Request, Response } from "express";
import { GetImages, ImageRepository, UploadImg } from "../../domain";
import { FileList } from "../../types/images.types";
import { CustomErrors } from "../../domain/errors/custom.errors";

export class ImagesControllers {
  constructor(private readonly imageRepository: ImageRepository) {}
  private handleError(err: any, res: Response) {
    if (err instanceof CustomErrors) {
      res.status(err.statusCode).send({ ok: false, message: err.message });
      return;
    }

    res.status(500).send(err);
  }

  public getImages = (req: Request, res: Response) => {
    const { image } = req.params;
    new GetImages(this.imageRepository)
      .execute(image)
      .then((resp) => res.status(200).send(resp))
      .catch((err) => this.handleError(err, res));
  };

  public uploadImages = (req: Request, res: Response) => {
    const files = req.files as FileList[];
    console.log(files);
    new UploadImg(this.imageRepository)
      .execute(files)
      .then((resp) => res.status(200).send(resp))
      .catch((err) => this.handleError(err, res));
  };
}
