import { ImageDatasource, ImageRepository } from "../../domain";
import { FileList, ImageResponse, Resource } from "../../types/images.types";

export class ImageRepositoryImp implements ImageRepository {
  constructor(private readonly imageDatasource: ImageDatasource) {}

  async getImages(imageId: string): Promise<Resource> {
    return this.imageDatasource.getImages(imageId);
  }
  uploadImages(files: FileList[]): Promise<ImageResponse[]> {
    return this.imageDatasource.uploadImages(files);
  }
}
