import React from "react";

const FeedbackCard = () => {
  return (
    <div className="bg-pri1 rounded">
      {/* The actual container holding the data */}
      <div className="p-7 flex justify-between items-start gap-x-[3.5rem]">
        {/* The container holdiing the reviewr's data */}
        <div className="w-2/5 grid gap-y-2">
          {/* reviewr's image */}
          <p className="bg-primary w-52 h-48"></p>
          {/* reviewer information */}
          <div className="grid gap-1">
            <p className="text-xl font-semibold">James Gareth</p>
            <p className="text-darkblue">Cyber security Student</p>
          </div>
        </div>

        {/* The container holding the review message */}
        <div className="grid gap-y-14 w-3/5">
          {/* Review */}
          <div className="font-semibold text-4xl grid gap-y-2">
            <p className="">“</p>

            <h3 className="text-lg font-normal">
              This is the best beginner friendly course I have ever enrolled
              for. From the tutors down to the conducive learning environment,
              every was just made for seamless interaction.
            </h3>

            <p className="text-right">”</p>
          </div>

          {/* Review date */}
          <p className="text-lg font-semibold text-darkblue text-right">
            22nd May, 2024
          </p>
        </div>
      </div>
    </div>
  );
};

export default FeedbackCard;
