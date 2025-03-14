import { FileList, ImageResponse } from "../../../types/images.types";
import { ImageRepository } from "../../repositories/image.repository";

interface UploadImgImp {
  execute(files: FileList[]): Promise<ImageResponse[]>;
}

export class UploadImg implements UploadImgImp {
  constructor(private readonly imageRepository: ImageRepository) {}
  execute(files: FileList[]): Promise<ImageResponse[]> {
    return this.imageRepository.uploadImages(files);
  }
}
