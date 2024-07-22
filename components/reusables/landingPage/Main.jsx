import Image from "next/image";
import image from "@/assets/images/main1.svg";

function Main() {
  return (
    <main className="p-4 pb-0 my-10 lg:my-16">
      <h2 className="lg:text-5xl text-left mb-10  w-[90%] mx-auto mr-auto text-3xl font-bold text-darkblue">
        Multiplying <span className="text-primary">skilled tech</span> talents
        in Africa
      </h2>

      <div className="flex flex-col-reverse md:flex-row items-center w-[90%] mx-auto gap-6">
        <div className="md:w-1/2">
          <p className="mb-4 text-lg">
            TechUnlock Nigeria is a tech training academy that simplifies the
            way we learn and advance our tech skills. We provide training
            programs and a development plan in the form of projects and
            mentorship for trainees to begin their tech career.
          </p>
          <p className="text-lg">
            TechUnlock creates an entry point for beginners who want to learn a
            tech skill, and for professionals who wish to switch career paths
            into tech or learn a more advanced skill.
          </p>
        </div>
        <div className="lg:w-1/2">
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
