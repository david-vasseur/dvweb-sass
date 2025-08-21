"use client";

import { X } from "lucide-react";
import { useModalStore } from "@/lib/stores/modalStore";
import ModalPortal from "./ModalPortal";


export default function Modal() {

    const { isOpen, content, closeModal } = useModalStore();

    if (!isOpen) return null;

    const handleClose = () => {
        closeModal();
    }

    return (
        <ModalPortal>
            <div
                className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[1000000]"
                onClick={() => handleClose()}
                >
                <div
                    className="relative z-[1000000] bg-gradient-to-br from-purple-700/20 to-black/50 text-white text-center cursor-default text-base xl:text-xl font-extrabold rounded-md py-20 px-10 border-1 border-orange-800 max-w-lg mx-4 lg:mx-auto w-full lg:w-2/3 shadow-lg shadow-black/90"
                    onClick={(e) => e.stopPropagation()}
                >
                    <X 
                    className="absolute right-3 top-3 stroke-3 text-purple-400 hover:scale-110 hover:text-red-600 transition-transform duration-300 cursor-pointer" 
                    onClick={() => handleClose()} 
                    />
                    {content}
                </div>
            </div>
        </ModalPortal>
    );
}