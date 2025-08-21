"use client"

import { useClerk } from '@clerk/nextjs';
import React from 'react';

export default function SignOutButton() {

    const { signOut } = useClerk();

    const handleSignOut = async () => {
        await signOut({ redirectUrl: '/' });
    };

    return (
        <div className='cursor-pointer absolute top-2 left-2 rounded-lg flex justify-center items-center px-4 py-2 bg-red-600 hover:bg-red-400 text-white font-bold transition-all duration-400' onClick={handleSignOut}>
            <span>Se deconnecter</span>
        </div>
    )
}
