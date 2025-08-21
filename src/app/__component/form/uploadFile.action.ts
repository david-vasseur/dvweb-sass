"use server"

import { Storage } from "@google-cloud/storage";
import path from "path";
import sharp from "sharp";

const serviceKeyPath = path.join(process.cwd(), "dvweb-469712-4f84557634a2.json");

const storage = new Storage({
  keyFilename: serviceKeyPath,
  projectId: "dvweb-469712",
});

const bucket = storage.bucket("gvs3d");

export async function uploadFile(file: File, name: string) {
 
  const buffer = Buffer.from(await file.arrayBuffer());

  const processedBuffer = await sharp(buffer)
    .webp({ quality: 90 }) 
    .withMetadata({ exif: undefined })   
    .toBuffer();

  const timestamp = Date.now();
  const uniqueName = `${name}-${timestamp}.webp`;

  const fileUpload = bucket.file(uniqueName);
  await fileUpload.save(processedBuffer, {
    contentType: "image/webp",
    resumable: false,
  });

  return `gs://${bucket.name}/${name}`;
}

