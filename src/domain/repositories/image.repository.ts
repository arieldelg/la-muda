import { Resource } from "../../types/images.types";

export abstract class ImageRepository {
  abstract getImages(imageId: string): Promise<Resource>;
}
