import React from 'react'
import testimony from '@/data/testimony'
import TestimonyCard from './TestimonyCard'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const TestimonyCarousel = () => {
  return (
    <div className="bg-pri1 w-[95%] mx-auto shadow-md">
      <div className="gap-x-5 grid grid-flow-col justify-between items-center w-[98%] mx-auto">
        <ChevronLeft size={30} />

        {testimony.map((testimony, index) => (
          <div key={index}>
            <TestimonyCard data={testimony} />
          </div>
        ))}

        <ChevronRight size={30} />
      </div>
    </div>
  );
}

export default TestimonyCarousel