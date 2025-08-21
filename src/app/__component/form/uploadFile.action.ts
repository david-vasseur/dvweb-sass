"use server"

import { Storage } from "@google-cloud/storage";
import path from "path";

const serviceKeyPath = path.join(process.cwd(), "dvweb-469712-4f84557634a2.json");

const storage = new Storage({
    keyFilename: serviceKeyPath,
    projectId: "dvweb-469712",
});

const bucket = storage.bucket("gvs3d");


export async function uploadFile(file: File, name: string) {
    
    const buffer = Buffer.from(await file.arrayBuffer());
    const timestamp = Date.now(); 
    const uniqueName = `${name}-${timestamp}`;

    const fileUpload = bucket.file(uniqueName);
    await fileUpload.save(buffer, {
        contentType: file.type, 
    });

    return `gs://${bucket.name}/${name}`;
}
