import { Storage } from "@google-cloud/storage";
import stream from "stream";
import { FileList, ImageResponse } from "../types/images.types";
import "dotenv/config";

let storage: Storage;
const bucketName = process.env.BUCKET_NAME!;
const private_key = process.env.PRIVATE_KEY;
const client_email = process.env.CLIENT_EMAIL;
if (process.env.STAGE === "dev") {
  storage = new Storage({
    projectId: bucketName,
    credentials: require("../../GCS.json"),
  });
} else {
  storage = new Storage({
    projectId: bucketName,
    credentials: {
      client_email: client_email,
      private_key: private_key,
    },
  });
}

export async function streamFileUpload(
  files: FileList[]
): Promise<ImageResponse[]> {
  const uploadedUrls: ImageResponse[] = [];
  //* Create a stream for the file Buffer

  for (const file of files) {
    const destFileName = file.originalname.trim().split(" ").join("");
    const myBucket = storage.bucket(bucketName);
    const gcsFile = myBucket.file(`imagenes/${destFileName}`);
    //* create a writable stream to GCS
    const writeStream = gcsFile.createWriteStream({
      metadata: {
        contentType: file.mimetype, //* set the type of file to upload
      },
    });

    const passthroughStream = new stream.PassThrough();
    passthroughStream.end(file.buffer); //* here we feed the file into passthroughStream

    try {
      await new Promise<void>((resolve, reject) => {
        passthroughStream
          .pipe(writeStream)
          .on("error", (error) => {
            console.error("Error subiendo imagen");
            reject(error);
          })
          .on("finish", () => {
            console.log(`${destFileName} uploaded to ${bucketName}`);
            uploadedUrls.push({
              id: destFileName,
              url: `https://storage.googleapis.com/${bucketName}/imagenes/${destFileName}`,
            });
            resolve();
          });
      });
    } catch (error) {
      console.log(error);
    }
  }

  return uploadedUrls;
}
