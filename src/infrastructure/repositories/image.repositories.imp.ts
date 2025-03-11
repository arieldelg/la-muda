import { ImageDatasource, ImageRepository } from "../../domain";
import { Resource } from "../../types/images.types";

export class ImageRepositoryImp implements ImageRepository {
  constructor(private readonly imageDatasource: ImageDatasource) {}
  async getImages(imageId: string): Promise<Resource> {
    return this.imageDatasource.getImages(imageId);
  }
}
