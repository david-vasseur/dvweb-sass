"use client"

import { useUser, SignedIn, SignedOut } from "@clerk/nextjs";
import { SingInForm } from "./__component/form/SignInForm";
import Link from "next/link";

export default function Home() {

	const { isSignedIn } = useUser();

	return (
		<div className="container mx-auto flex flex-col gap-20 justify-center items-center font-sans min-h-screen">
			<SignedOut>
				<>
					<h1 className="font-black text-3xl text-white/80">Merci de vous connecter</h1>
					<SingInForm />
				</>
			</SignedOut>
			
			<SignedIn>
				<>
					<Link href={"/upload"} className="rounded-lg px-4 py-2 bg-purple-500 text-white font-bold">Uploader un fichier</Link>
				</>
			</SignedIn>
		</div>
	);
}
