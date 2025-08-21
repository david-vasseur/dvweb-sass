"use server"

import { Storage } from "@google-cloud/storage";
import path from "path";
import sharp from "sharp";
import bucketMappingJson from '../../../data/bucket.json';
import { auth } from "@clerk/nextjs/server";

const serviceKeyPath = path.join(process.cwd(), "dvweb-469712-4f84557634a2.json");

const storage = new Storage({
  keyFilename: serviceKeyPath,
  projectId: "dvweb-469712",
});

export async function uploadFile(file: File, name: string) {

    const { userId } = await auth();

    if (!userId) {
        return { success: false, message: "Une erreur s'est produit lors de l'upload" }
    }

    const bucketMapping : Record<string, string> = bucketMappingJson;

    const bucketName = bucketMapping[userId]

    const bucket = storage.bucket(bucketName)
 
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

  return { success: true, message: "Upload du fichier reussi avec succès" }
}

