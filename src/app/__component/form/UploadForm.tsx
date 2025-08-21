"use client"

import { motion } from 'framer-motion';
import { useForm } from "@tanstack/react-form"
import { Send, Upload } from "lucide-react";
import { useModalStore } from "@/lib/stores/modalStore";
import { IUpload, UploadSchema } from "@/schema/uploadSchema";
import { uploadFile } from './uploadFile.action';

export const UploadForm = () => {

    const { openModal } = useModalStore();

    const form = useForm({
        defaultValues: {
            name: "",
            file: new File([], ""),
        } as IUpload,
        validators: {
            onChange: UploadSchema,
        },
        onSubmit: async ({ value }) => {
            
            if (!value.file) {
                return
            }

            const url = await uploadFile(value.file, value.name);
            console.log(url);

            if (url === `gs://gvs3d/${value.name}`) {
                openModal('Upload reussi avec succès');
            } else {
                openModal("Une erreur s'est produit lors de l'upload");
            }
        },
    })


    return (
        <form 
            className="space-y-4 px-2 lg:px-10 py-10 border-1 border-purple-300 rounded-lg"
            onSubmit={(e) => {
                e.preventDefault()
                form.handleSubmit()
            }}
        >
            
            <form.Field
                name="name">
                {({ state, handleBlur, handleChange }) => (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.7 + 1 * 0.1, duration: 0.4 }}
                    >
                        <label className="sr-only">Nom du fichier</label>
                        <input 
                            aria-invalid={
                                state.meta.errors.length > 0 && state.meta.isTouched
                            }
                            className="w-full rounded-md border border-gray-700 bg-transparent py-2 px-3 text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none transition"
                            placeholder="Nom du fichier"
                            value={state.value}
                            onBlur={handleBlur}
                            onChange={(e) => handleChange(e.target.value)}
                        />
                        {state.meta.errors.length > 0 && state.meta.isTouched ? (
                            <p 
                                className="text-red-500 font-semibold text-xs">
                                    {state.meta.errors[0]?.message}
                            </p>
                        ) : null
                        }
                    </motion.div>
                    
                )}
            </form.Field>

            <form.Field 
                name="file">
                {({ state, handleBlur, handleChange }) => (
                    <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.7 + 2 * 0.1, duration: 0.4 }}
                    >
                    <label className="sr-only">Votre Fichier</label>
                    <input
                        type="file"
                        aria-invalid={state.meta.errors.length > 0 && state.meta.isTouched}
                        className="w-full rounded-md border border-gray-700 bg-transparent py-2 px-3 text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none transition"
                        placeholder="Cliquer pour charger un fichier"
                        onBlur={handleBlur}
                        onChange={(e) => {
                        const file = e.target.files ? e.target.files[0] : null;
                        handleChange(file);
                        }}
                    />
                    {state.meta.errors.length > 0 && state.meta.isTouched ? (
                        <p className="text-red-500 font-semibold text-xs">
                        {state.meta.errors[0]?.message}
                        </p>
                    ) : null}
                    </motion.div>
                )}
            </form.Field>

            <div className='flex flex-col items-center mt-10'>
                <form.Subscribe 
                    selector={(state) => [state.canSubmit, state.isSubmitting]}
                    // eslint-disable-next-line react/no-children-prop
                    children={([canSubmit, isSubmitting]) => (
                        <motion.button 
                            type="submit" 
                            disabled={!canSubmit || isSubmitting}
                            className="inline-flex items-center justify-center space-x-2 rounded-md bg-purple-400/60 px-6 py-3 font-semibold text-black hover:text-white hover:bg-purple-700/30 transition cursor-pointer"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}    
                        >
                        {isSubmitting ? "..." : (
                            <span className="flex items-center">
                                <Upload className="mr-2" />
                                Envoyer
                            </span>
                        )}
                    </motion.button>
                    )}            
                >    
                </form.Subscribe>
            </div>
            
        </form>
    )
}
