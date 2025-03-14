import { Request, Response } from "express";
import {
  GetImages,
  ImageRepository,
  CustomErrors,
  UploadImg,
} from "../../domain";
import { FileList } from "../../types/images.types";
import { streamFileUpload } from "../../config/cloudStorage";

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

  public uploadImages = async (req: Request, res: Response) => {
    const files = req.files as FileList[];
    if (!files || files.length === 0) {
      res.status(400).send("No files uploaded.");
      return;
    }

    new UploadImg(this.imageRepository)
      .execute(files)
      .then((resp) => res.status(200).send(resp))
      .catch((err) => this.handleError(err, res));
  };
}
