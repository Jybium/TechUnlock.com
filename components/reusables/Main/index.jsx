/* eslint-disable @next/next/no-img-element */
import image from "@/assets/images/main1.svg"
import Image from "next/image";


function Main() {
    return (
        <main className="flex flex-col items-center min-h-screen p-4">
            <div className="text-center my-8">
                <h1 className="text-5xl font-bold text-darkblue">
                    Multiplying <span className="text-primary">skilled tech</span> talents in Africa
                </h1>
            </div>

            <div className="flex flex-col md:flex-row items-center w-full max-w-4xl gap-6">
                <div className="md:w-1/2  p-4">
                    <h2 className="text-3xl text-darkblue font-semibold mb-4">About TechUnlock</h2>
                    <p className="mb-4 text-base ">
                        TechUnlock Nigeria simplifies the way we learn and acquire tech skills. We provide training plans and a development plan in the form of internship for trainees to begin their tech career.
                    </p>
                    <p className="text-base">
                        TechUnlock creates an entry point for beginners who want to learn a tech skill, and for professionals who wish to switch career paths into tech or learn a more advanced skill.
                    </p>
                </div>
                <div className="md:w-1/2 p-4">
                    <Image src={image} alt="Tech" className="w-full h-auto rounded-md shadow-md" />
                </div>
            </div>

            <div className="bg-['/assets/images/map.svg']">
<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil, nesciunt. Nisi a unde pariatur molestiae, neque praesentium enim architecto quidem aut doloremque dolore nulla tenetur modi repellendus autem, accusamus obcaecati?</p>
            </div>
        </main>
    );
}

export default Main