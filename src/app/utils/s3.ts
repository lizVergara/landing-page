import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  ListObjectsCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3Client = new S3Client({
  region: process.env.AWS_BUCKET_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
  },
});

export async function uploadFileToS3(
  file: any,
  fileName: string,
  fileType: string
) {
  try {
    const command = new PutObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: fileName,
      Body: file,
      ContentType: fileType,
    });

    const response = await s3Client.send(command);
    if (response) {
      const getObjectParams = new GetObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: fileName,
      });
      const url = await getSignedUrl(s3Client, getObjectParams, {
        expiresIn: 50000,
      });
      return url;
    }
    return null;
  } catch (error) {
    console.error("Error uploading file to S3:", error);
    return null;
  }
}

export async function retrieveFileFromS3(fileName: string) {
  try {
    const command = new GetObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: fileName,
    });

    const url = await getSignedUrl(s3Client, command, { expiresIn: 300 });

    return url;
  } catch (error) {
    console.error("Error retrieving file from S3:", error);
    return null;
  }
}
