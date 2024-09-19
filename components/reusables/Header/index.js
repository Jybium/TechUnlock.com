/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import image from "@/assets/images/headerbg.svg";

const Header = () => {
  return (
    <header className="w-full bg-header-img bg-cover flex justify-around text-pri1">
      <div className="absolute inset-0 bg-gradient-to-r from-sky-500 to-sky-800 opacity-50"></div>
      <section className="flex flex-col items-start pl-4 justify-center z-10 w-[689px] gap-10">
        <h1 className="text-[5.5rem] font-bold">
          Switch your Tech skill<span> on</span>
        </h1>
        <div className="leading-8">
          <p>
            Start your journey to learning highly sought after tech skills for
            FREE.
          </p>
          <p>
            Find and connect with friends who are on the same learning journey
            as you.
          </p>
        </div>
        <div className="md:flex items-center gap-5 hidden">
          <button className="w-36 rounded-xl bg-white text-sec10">
            Start Learning
          </button>
          <button className="w-36 rounded-xl border-pri1 border-2">
            Learn at your pace
          </button>
        </div>
      </section>
      <section className="z-10 flex items-center">
        <Image
          src={image}
          alt="header image"
          className="w-[700px]"
        />
      </section>
    </header>
  );
};

export default Header;
