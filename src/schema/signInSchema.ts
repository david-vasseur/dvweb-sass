import { z } from "zod";

export const SignInSchema = z.object({
    userName: z
        .string()
        .min(8, "Le nom d'utilisateur doit contenir au moins 8 caractères")
        .max(32, "Le nom d'utilisateur ne peut pas dépasser 32 caractères"),

    password: z
        .string()
        .min(8, "Le mot de passe doit contenir au moins 8 caractères")
        .max(16, "Le mot de passe ne peut pas dépasser 16 caractères"),
});

export type ISignIn = z.infer<typeof SignInSchema>;
