import Image from 'next/image'
import React from 'react'

const TestimonialCard = ({item}) => {
  return (
    <div className='' key={item.id}>
        <div className="">
            <div className="">
                <p className="">{item.number} <span className="">{item.value}</span></p>
                <p className="">{item.message}</p>
                <p className="">{item.name} <span className="">{item.profession}</span></p>
            </div>

            <div className="">
                <Image src="" alt="" width={100} height={100} className='' />
            </div>
        </div>
    </div>
  )
}

export default TestimonialCard