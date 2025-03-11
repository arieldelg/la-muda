import { ImageRepository } from "../../repositories/image.repository";
import { Resource } from "../../../types/images.types";

interface GetImagesImp {
  execute(imageId: string): Promise<Resource>;
}

export class GetImages implements GetImagesImp {
  constructor(private readonly imagesRepository: ImageRepository) {}
  execute(imageId: string): Promise<Resource> {
    return this.imagesRepository.getImages(imageId);
  }
}
