import { Client } from "minio";
import crypto from "crypto";
import config from "../config";

const useSSL = config.MINIO_USE_SSL === "true";
const protocol = useSSL ? "https" : "http";
const portPart = config.MINIO_PORT && !useSSL ? `:${config.MINIO_PORT}` : "";

export const client = new Client({
  endPoint: config.MINIO_ENDPOINT!,
  port: Number(config.MINIO_PORT) || undefined,
  useSSL,
  accessKey: config.MINIO_ACCESS_KEY!,
  secretKey: config.MINIO_SECRET_KEY!,
});

export const StorageService = {
  ensureBucket: async (bucket: string) => {
    try {
      const exists = await client.bucketExists(bucket);
      if (!exists) await client.makeBucket(bucket);
    } catch (err) {
      console.error(`Failed to ensure bucket ${bucket}:`, err);
      throw err;
    }
  },

  uploadFile: async (bucket: string, file: Express.Multer.File) => {
    await StorageService.ensureBucket(bucket);

    const uniqueName = `${crypto.randomUUID()}-${file.originalname}`;
    await client.putObject(bucket, uniqueName, file.buffer, file.size, {
      "Content-Type": file.mimetype,
    });

    const fileUrl = `${protocol}://${config.MINIO_ENDPOINT}${portPart}/${bucket}/${uniqueName}`;
    return { fileUrl, key: uniqueName };
  },

  deleteFile: async (bucket: string, fileUrl: string) => {
    try {
      // Extract the object key from full URL
      const url = new URL(fileUrl);
      const parts = url.pathname.split("/").filter(Boolean); // remove empty segments
      const objectName = parts.slice(1).join("/"); // bucket/object
      await client.removeObject(bucket, objectName);
      console.log(`Deleted ${objectName} from bucket ${bucket}`);
    } catch (err) {
      console.warn("Failed to delete old file:", err);
    }
  },
};
