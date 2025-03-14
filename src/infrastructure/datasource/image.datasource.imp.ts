import { streamFileUpload } from "../../config";
import { cloudinary } from "../../config/cloudinary";
import { ImageDatasource } from "../../domain";
import { CustomErrors } from "../../domain/errors/custom.errors";
import { Resource, FileList, ImageResponse } from "../../types/images.types";

export class ImageDatasourceImp implements ImageDatasource {
  private handleError(error: any) {
    if (error instanceof CustomErrors) return error;
    return CustomErrors.InternalErrorServer("Something Went Wrong" + error);
  }

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
      throw this.handleError(error);
    }
  }

  uploadImages(files: FileList[]): Promise<ImageResponse[]> {
    return streamFileUpload(files);
  }
}

/**
 * ! Using Cloudinary
 private async helperSaveFoto(file: FileList): Promise<ImageResponse> {
    const data = await cloudinary.uploader.upload(file.path);
    return {
      url: data.secure_url,
      id: data.public_id,
    };
  }

  private handleDeleteUploadFolder(file: FileList) {
    if (fs.existsSync(file.path)) {
      fs.unlink(file.path, (err) => {
        if (err) console.log(err);
      });
    }
  } 
    
 async uploadImages(files: FileList[]): Promise<ImageResponse[]> {
    
    try {
      const promiseArray = [];
      for (const file of files) {
        promiseArray.push(this.helperSaveFoto(file));
      }

      //! Aquí hacemos las promesas y cuando entregue una respuesta eliminamos el archivo que se guardo en filesystem
      const data = Promise.all(promiseArray).then((resp) => {
        files.forEach((file) => this.handleDeleteUploadFolder(file));

        return resp;
      });
      return data;
    } catch (error) {
      throw this.handleError(error);
    }
  }
  
 */
