/* eslint-disable @next/next/no-img-element */
import image from "@/assets/images/main1.svg";
import Image from "next/image";

function Main() {
  return (
    <main className="flex flex-col items-center p-4 pb-0 my-20">
      <div className="text-center mb-10">
        <h1 className="text-5xl font-bold text-darkblue">
          Multiplying <span className="text-primary">skilled tech</span> talents
          in Africa
        </h1>
      </div>

      <div className="flex flex-col md:flex-row items-center w-[90%] mx-auto gap-6">
        <div className="md:w-1/2">
          <p className="mb-4 text-lg">
            TechUnlock Nigeria is a tech training academy that simplifies the
            way we learn and advance our tech skills. We provide training
            programs and a development plan in the form of internship for
            trainees to begin their tech career.
          </p>
          <p className="text-lg">
            TechUnlock creates an entry point for beginners who want to learn a
            tech skill, and for professionals who wish to switch career paths
            into tech or learn a more advanced skill.
          </p>
        </div>
        <div className="md:w-1/2 ">
          <Image
            src={image}
            alt="Tech"
            className="block w-full h-2/3 object-cover"
          />
        </div>
      </div>
    </main>
  );
}

export default Main;
