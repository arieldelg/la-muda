import { Resource } from "../../types/images.types";

export abstract class ImageDatasource {
  abstract getImages(imageId: string): Promise<Resource>;
}
