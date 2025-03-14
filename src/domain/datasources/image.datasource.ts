import { FileList, ImageResponse, Resource } from "../../types/images.types";

export abstract class ImageDatasource {
  abstract getImages(imageId: string): Promise<Resource>;
  abstract uploadImages(files: FileList[]): Promise<ImageResponse[]>;
}
