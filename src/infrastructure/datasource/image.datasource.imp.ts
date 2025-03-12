import { cloudinary } from "../../config/cloudinary";
import { ImageDatasource } from "../../domain";
import { CustomErrors } from "../../domain/errors/custom.errors";
import { Resource } from "../../types/images.types";

export class ImageDatasourceImp implements ImageDatasource {
  async getImages(imageId: string): Promise<Resource> {
    try {
      const response = await cloudinary.api.resource(imageId);

      if (!response) {
        throw CustomErrors.NotFound(
          `Image with id ${imageId} not found in database`
        );
      }

      return response;
    } catch (error) {
      if (error instanceof CustomErrors) throw error;
      throw CustomErrors.InternalErrorServer("Something went wrong" + error);
    }
  }
}
