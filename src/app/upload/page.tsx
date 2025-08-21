"use client";

import { useUser, SignedIn, SignedOut } from "@clerk/nextjs";
import { UploadForm } from "../__component/form/UploadForm";
import SignOutButton from "../__component/SignOutButton";
import Link from "next/link";

export default function UploadPage() {
    const { user } = useUser();

    return (
        <div className="container lg:mx-auto flex flex-col gap-10 justify-center items-center font-sans min-h-screen">
            <SignedIn>
                <SignOutButton />
                <h1 className='font-black text-3xl text-center text-purple-400'>
                    Bonjour {user?.firstName}
                </h1>
                <h2 className="font-black text-3xl text-center text-white/80">
                    Formulaire pour ajouter un fichier à votre projet
                </h2>
                <UploadForm />
            </SignedIn>
            <SignedOut>
                <h1 className='text-red-600 font-black text-3xl'>ACCES REFUSE</h1>
                <h2 className='text-purple-600 font-black text-2xl'>Veuillez vous connecter</h2>
                <Link href={"/"} className="rounded-lg px-4 py-2 bg-purple-500 text-white font-bold">Se connecter</Link>
            </SignedOut>
        </div>
    );
}