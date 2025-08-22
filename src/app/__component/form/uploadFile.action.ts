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

	const timestamp = Date.now();

	if (!file.type.startsWith("image/")) {
		const fileUpload = bucket.file(`${name}-${timestamp}`);
		try {
			await fileUpload.save(buffer, {
				contentType: file.type, 
				resumable: false,
			});
			
		} catch (error) {
			return { success: false, message: "Une erreur s'est produit lors de l'upload" }
		}
		
		return { success: true, message: "Upload du fichier réussi avec succès" };
	}

	const processedBuffer = await sharp(buffer)
		.webp({ quality: 90 }) 
		.withMetadata({ exif: undefined })   
		.toBuffer();

	
	const uniqueName = `${name}-${timestamp}.webp`;

	const fileUpload = bucket.file(uniqueName);
	try {
		await fileUpload.save(processedBuffer, {
			contentType: "image/webp",
			resumable: false,
		});
	} catch (error) {
		return { success: false, message: "Une erreur s'est produit lors de l'upload" }
	}
	
	return { success: true, message: "Upload du fichier reussi avec succès" }
}

