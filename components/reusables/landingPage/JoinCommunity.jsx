import React from 'react'
import Image from 'next/image'
import community from "@/assets/landing-page/community.svg";

const JoinCommunity = () => {
  return (
    <div className="w-full">
      <h1 className="text-first-primary font-semibold text-4xl text-center">
        Join our Community
      </h1>
      <div className="flex justify-between items-center w-[90%] mx-auto mt-8">
        <div className="w-[40%]">
          <h2 className="text-first-primary font-semibold text-5xl leading-normal">
            Start <span className="text-primary">learning</span> a tech skill
            now or get <span className="text-primary">in touch</span> with us
            and ask your
            <span className="text-primary"> questions.</span>
          </h2>
        </div>
        <div className="w-[60%] ml-auto">
          <Image src={community} alt="community interaction" className='block h-full w-full object-cover'/>
        </div>
      </div>
    </div>
  );
}

export default JoinCommunity