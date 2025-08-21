"use client"

import { motion } from 'framer-motion';
import { useForm } from "@tanstack/react-form"
import { User } from "lucide-react";
import { useModalStore } from "@/lib/stores/modalStore";
import { ISignIn, SignInSchema } from '@/schema/signInSchema';
import { useSignIn } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

export const SingInForm = () => {

    const { openModal } = useModalStore();
    const { signIn } = useSignIn();
    const router = useRouter();

    const form = useForm({
        defaultValues: {
            userName: "",
            password: "",
        } as ISignIn,
        validators: {
            onChange: SignInSchema,
        },
        onSubmit: async ({ value }) => {
            
            console.log(value);

            try {
                const result = await signIn?.create({
                    identifier: value.userName, 
                    password: value.password
                })

                if (result?.status === "complete") {
                    openModal('Connexion reussi');
                    window.location.href= "/";
                } 
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (error: any) {
                if (error.errors && error.errors[0]?.longMessage) {
                    openModal("Identifiant ou Mot de passe incorrect");
                } else if (error.message) {
                    openModal("Identifiant ou Mot de passe incorrect");
                } else {
                    openModal("Identifiant ou Mot de passe incorrect");
                }
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
                name="userName">
                {({ state, handleBlur, handleChange }) => (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.7 + 1 * 0.1, duration: 0.4 }}
                    >
                        <label className="sr-only">Nom d&apos;utilisateur</label>
                        <input 
                            aria-invalid={
                                state.meta.errors.length > 0 && state.meta.isTouched
                            }
                            className="w-full rounded-md border border-gray-700 bg-transparent py-2 px-3 text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none transition"
                            placeholder="Nom d'utilisateur"
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
                name="password">
                {({ state, handleBlur, handleChange }) => (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.7 + 1 * 0.1, duration: 0.4 }}
                    >
                        <label className="sr-only">Mot de passe</label>
                        <input 
                            aria-invalid={
                                state.meta.errors.length > 0 && state.meta.isTouched
                            }
                            className="w-full rounded-md border border-gray-700 bg-transparent py-2 px-3 text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none transition"
                            placeholder="Mot de passe"
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
                                <User className="mr-2" />
                                Se connecter
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