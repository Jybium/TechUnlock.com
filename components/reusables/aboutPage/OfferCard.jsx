import React from 'react'

const OfferCard = ({item}) => {
  return (
    <div className=''>
        <span className="">{item.id}</span>
        <h4 className="">{item.title}</h4>
        <p className="">{item.description}</p>
    </div>
  )
}

export default OfferCard