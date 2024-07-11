"use client"
import { useModal } from '@/Context/modal';
import React from 'react';

const Modal = ({ children }) => {

    const { modal, setModal} = useModal()

    const HandleModalClick = () => {
        setModal(false)
    }

    return (
        <>
            {modal &&
                <div className="fixed inset-0 flex items-end lg:items-center lg:justify-center z-50 ">
                    <div className="fixed inset-0 hidden lg:flex lg:h-auto bg-black/20 backdrop-blur-lg " onClick={HandleModalClick}></div>
                    <div className="relative bg-white p-6 rounded-lg shadow-lg z-10 w-full h-[calc(100vh-80vh)]  min-h-[calc(100vh-80px)] lg:min-h-max lg:h-auto lg:w-2/3 lg:max-w-xl mx-auto">
                    {
                        <div>
                            hello orkd 
                        </div>
                    }
                    </div>
                </div>
            }
        </>
    );
};

export default Modal;