import { z } from "zod";

const MAX_FILE_SIZE = 20 * 1024 * 1024; 
const ACCEPTED_TYPES = ["image/jpeg", "image/png", "application/pdf"];

const fileNameRegex = /^[A-Za-z0-9._ -]{2,1024}$/;

export const UploadSchema = z.object({
    name: z
        .string()
        .min(2, "Le nom du fichier doit contenir au moins 2 caractères")
        .max(1024, "Le nom du fichier ne peut pas dépasser 1024 caractères")
        .regex(
        fileNameRegex,
        "Le nom contient des caractères non autorisés (uniquement lettres, chiffres, ., _, -, espace)"
        ),

    file: z
        .instanceof(File)
        .nullable() 
        .refine((file) => file == null || file.size <= MAX_FILE_SIZE, {
        message: "Le fichier est trop volumineux (max 20MB)",
        })
        // .refine((file) => file == null || ACCEPTED_TYPES.includes(file.type), {
        // message: "Type de fichier non supporté",
        // }),
});

export type IUpload = z.infer<typeof UploadSchema>;

const defaultValues: IUpload = {
    name: "",
    file: null,
};
