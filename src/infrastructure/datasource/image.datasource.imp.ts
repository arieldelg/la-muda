import { cloudinary } from "../../config/cloudinary";
import { ImageDatasource } from "../../domain";
import { Resource } from "../../types/images.types";

export class ImageDatasourceImp implements ImageDatasource {
  async getImages(imageId: string): Promise<Resource> {
    try {
      const response = await cloudinary.api.resource(imageId);
      return response;
    } catch (error) {
      throw new Error("Error haciendo fetch images");
    }
  }
}
