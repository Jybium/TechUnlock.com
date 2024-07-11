
"use client";
import React, { useState } from 'react';
import { useModal } from '@/Context/modal';
import Modal from '@/components/reusables/Modal';
import image from "@/assets/images/logo.svg";
import Link from "next/link";
import Image from "next/image";


const SelectPaymentGuide = () => {
    const { setModal } = useModal();
    const [modalContent, setModalContent] = useState(null);

    const handleOpenModal = (content) => {
        setModalContent(content);
        setModal(true);
    };

    return (
        // <div className="">
        //     <nav className="w-full bg-pri1 p-4 flex items-center rounded-md">
        //         <Link href="/">
        //             <div className="md:cursor-pointer z-50 md:w-auto w-full flex items-center">
        //                 <Image src={image} alt="techUnlock logo" className="w-60" />
        //             </div>
        //         </Link>
        //     </nav>


        //     <main className=" bg-cover bg-[url('@/assets/images/payment-bg.svg')]">
        //         <div className="flex items-center">
        //             <Link href="/" className="flex items-center justify-around text-primary border border-gray-900 rounded-md bg-amber-50 p-2">
        //                 <span className="text-primary">← </span> <span>Go Back</span>
        //             </Link>
        //         </div>
        //         <h1 className="text-xl text-center text-pri10 font-semibold">To continue to our enrollment page, kindly make payment for the course</h1>
        //         <div className="flex flex-col justify-between mb-8 gap-y-6 max-w-4xl mx-auto">
        //             <label className="inline-flex items-center mt-3 space-x-4 space-y-2">
        //                 <input type="radio" className="form-radio h-6 w-6 text-blue-600 custom-radio" checked readOnly />
        //                 <span>For you selected course and level <span className='text-primary'>UI/UX Design Advanced level</span>, your payment fee is <span className='text-pri10 font-bold'>#200,000</span></span>
        //             </label>
        //             <label className="inline-flex items-center mt-3 space-x-4">
        //                 <input type="radio" className="form-radio h-6 w-6 text-blue-600 custom-radio" checked readOnly />
        //                 <span>You are expected to pay before you get enlisted in the training.</span>
        //             </label>
        //             <label className="inline-flex items-center mt-3 space-x-4">
        //                 <input type="radio" className="form-radio h-6 w-6 text-blue-600 custom-radio" checked readOnly />
        //                 <span>You get access to the courses modules, email notification, and constant updates just before the training.</span>
        //             </label>
        //             <label className="inline-flex items-center mt-3 space-x-4">
        //                 <input type="radio" className="form-radio h-6 w-6 text-blue-600 custom-radio" checked readOnly />
        //                 <span>This training will be held virtually.</span>
        //             </label>
        //             <label className="inline-flex items-center mt-3 space-x-4">
        //                 <input type="radio" className="form-radio h-6 w-6 text-blue-600 custom-radio" checked readOnly />
        //                 <span>Trainers will communicate the time and space for the training with you as soon as you make payment</span>
        //             </label>
        //             <label className="inline-flex items-center mt-3 space-x-4">
        //                 <input type="radio" className="form-radio h-6 w-6 text-[#561e8f] custom-radio" checked readOnly />
        //                 <span>You will receive a confirmation mail after a successful transaction.</span>
        //             </label>
        //         </div>

        //         <Link href="/"
        //             // onClick={() => handleOpenModal(
        //             //     <div>
        //             //         <h2 className="text-xl mb-4">Select Payment Method</h2>
        //             //         <p>Details about payment methods...</p>
        //             //         <button onClick={() => handleOpenModal(
        //             //             <div>
        //             //                 <h2 className="text-xl mb-4">Additional Payment Information</h2>
        //             //                 <p>More details about another payment method...</p>
        //             //             </div>
        //             //         )} className="bg-blue-600 p-2 rounded text-white mt-4">
        //             //             Show Another Modal
        //             //         </button>
        //             //     </div>
        //             // )} 
        //             className="">
        //             <span className='text-primary underline text-center border rounded-md p-2 bg-amber-50'>  Select payment method <span> &rarr;</span></span>
        //         </Link>
        //     </main>

        //     <Modal>
        //         {modalContent}
        //     </Modal>
        // </div>
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
            <nav className="w-full bg-pri1 p-4 flex items-center rounded-md">
                <Link href="/">
                    <div className="md:cursor-pointer z-50 md:w-auto w-full flex items-center">
                        <Image src={image} alt="techUnlock logo" className="w-60" />
                    </div>
                </Link>
            </nav>

            <main className="bg-cover bg-[url('@/assets/images/payment-bg.svg')] max-w-4xl mx-auto my-16 p-4">
                <div className="flex items-center mb-4">
                    <Link href="/" className="flex items-center justify-start text-primary border shadow-lg rounded-md bg-amber-50 p-2">
                        <span className="text-primary">←</span> <span>Go Back</span>
                    </Link>
                </div>
                <h1 className="text-xl text-center text-pri10 font-semibold my-8">To continue to our enrollment page, kindly make payment for the course</h1>
                <div className="flex flex-col justify-between mb-8 gap-y-4 max-w-4xl mx-auto">
                    <label className="inline-flex items-center mt-3 space-x-4">
                        <input type="radio" className="form-radio h-6 w-6 text-blue-600 custom-radio" checked readOnly />
                        <span>For you selected course and level <span className='text-primary'>UI/UX Design Advanced level</span>, your payment fee is <span className='text-pri10 font-bold'>#200,000</span></span>
                    </label>
                    <label className="inline-flex items-center mt-3 space-x-4">
                        <input type="radio" className="form-radio h-6 w-6 text-blue-600 custom-radio" checked readOnly />
                        <span>You are expected to pay before you get enlisted in the training.</span>
                    </label>
                    <label className="inline-flex items-center mt-3 space-x-4">
                        <input type="radio" className="form-radio h-6 w-6 text-blue-600 custom-radio" checked readOnly />
                        <span>You get access to the courses modules, email notification, and constant updates just before the training.</span>
                    </label>
                    <label className="inline-flex items-center mt-3 space-x-4">
                        <input type="radio" className="form-radio h-6 w-6 text-blue-600 custom-radio" checked readOnly />
                        <span>This training will be held virtually.</span>
                    </label>
                    <label className="inline-flex items-center mt-3 space-x-4">
                        <input type="radio" className="form-radio h-6 w-6 text-blue-600 custom-radio" checked readOnly />
                        <span>Trainers will communicate the time and space for the training with you as soon as you make payment</span>
                    </label>
                    <label className="inline-flex items-center mt-3 space-x-4">
                        <input type="radio" className="form-radio h-6 w-6 text-[#561e8f] custom-radio" checked readOnly />
                        <span>You will receive a confirmation mail after a successful transaction.</span>
                    </label>
                </div>

                <Link href="/" className="flex items-center justify-center text-primary bg-amber-50">
                    <span className='text-primary border rounded-md px-4 py-2 shadow-md'>Select payment method &rarr;</span>
                </Link>
            </main>

            <Modal>
                {modalContent}
            </Modal>
        </div>

    );
};

export default SelectPaymentGuide;
